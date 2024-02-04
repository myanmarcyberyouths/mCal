import AriaRoot from "./aria-root";
import {gridSelector} from "./constants.aria";
import utils from "./utils.aria";

export interface AriaGridProps {
  rowSelector: string,
  colSelector: string,
  handlers?: {
    onReachStart?: () => void
    onReachEnd?: () => void
  }
}

class Grid extends AriaRoot {

  grid: HTMLElement[][];
  rowSelector: string;
  colSelector: string;
  focusedRow: number;
  focusedCol: number;
  shouldWrapCols: boolean;
  handlers?: {
    onReachStart?: () => void
    onReachEnd?: () => void
  }

  constructor(containerNode: HTMLElement, props: AriaGridProps) {

    super(containerNode)

    this.grid = []
    this.rowSelector = props.rowSelector
    this.colSelector = props.colSelector
    this.shouldWrapCols = true
    this.handlers = props.handlers

    this.setupFocusGrid()
    this.setFocusPointer(0, 0)
    this.setInitialFocus()

    // this.registerEvents()
  }

  private isValidCell (row: number, col: number) {
    return !isNaN(row) && !isNaN(col) && row >= 0 && col >= 0 && this.grid && this.grid.length && row < this.grid.length && col < this.grid[row].length;
  };

  private isHidden (row: number, col: number) {
    var cell = this.containerNode?.querySelectorAll(gridSelector.ROW)[row].querySelectorAll(gridSelector.CELL)[col];
    return utils.hasClass(cell, 'hidden');
  };

  private focusCell (row: number, col: number) {
    console.log(row, col)
    console.log(this.grid.length)
    if(this.setFocusPointer(row, col)) {
      this.grid[row][col].focus();
    }
  };

  private setInitialCell (row: number | string, col: number | string) {
    this.containerNode.setAttribute('data-initialRow', row.toString())
    this.containerNode.setAttribute('data-initialCol', col.toString())
  }

  /**
 * @description
 * Get next cell to the right or left (direction) of the focused
 * cell.
 * @param currRow
 * Row index to start searching from
 * @param currCol
 * Column index to start searching from
 * @param directionX
 * X direction for where to check for cells. +1 to check to the right, -1 to
 * check to the left
 * @param directionY
 * @returns {false | object}
 * Indices of the next cell in the specified direction. Returns the focused
 * cell if none are found.
 */
  getNextCell = (currRow: number, currCol: number, directionX: number, directionY: number) => {
    var row = currRow + directionY;
    var col = currCol + directionX;
    var rowCount = this.grid.length;
    var isLeftRight = directionX !== 0;

    if(!rowCount) {
      return null;
    }

    var colCount = this.grid[0].length;

    if(this.shouldWrapCols && isLeftRight) {
      if(col < 0) {
        col = colCount - 1;
        row--;
      }

      if(col >= colCount) {
        col = 0;
        row++;
      }
    }

    // if(this.shouldWrapRows && !isLeftRight) {
    //   if(row < 0) {
    //     col--;
    //     row = rowCount - 1;
    //     if(this.grid[row] && col >= 0 && !this.grid[row][col]) {
    //       // Sometimes the bottom row is not completely filled in. In this case,
    //       // jump to the next filled in cell.
    //       row--;
    //     }
    //   } else if(row >= rowCount || !this.grid[row][col]) {
    //     row = 0;
    //     col++;
    //   }
    // }

    if(this.isValidCell(row, col)) {
      return {
        row: row,
        col: col,
      };
    } else if(this.isValidCell(currRow, currCol)) {
      return {
        row: currRow,
        col: currCol,
      };
    } else {
      return null;
    }
  };

  getNextVisibleCell = (directionX: number, directionY: number) => {
    var nextCell = this.getNextCell(this.focusedRow, this.focusedCol, directionX, directionY);

    if(!nextCell) {
      return null;
    }

    while(this.isHidden(nextCell?.row, nextCell?.col)) {
      var currRow = nextCell?.row;
      var currCol = nextCell?.col;

      nextCell = this.getNextCell(currRow, currCol, directionX, directionY);

      if(currRow === nextCell?.row && currCol === nextCell?.col) {
        // There are no more cells to try if getNextCell returns the current cell
        return null;
      }
    }

    return nextCell;
  };

  /**
 * @description
 *  Reset focused row and col if it doesn't match focusedRow and focusedCol
 * @param focusedTarget
 *  Element that is currently focused by browser
 */
  findFocusedItem = (focusedTarget: HTMLElement) => {
    var focusedCell = this.grid[this.focusedRow][this.focusedCol];

    if(focusedCell === focusedTarget || focusedCell.contains(focusedTarget)) {
      return;
    }

    for(var i = 0; i < this.grid.length; i++) {
      for(var j = 0; j < this.grid[i].length; j++) {
        if(this.grid[i][j] === focusedTarget || this.grid[i][j].contains(focusedTarget)) {
          this.setFocusPointer(i, j);
          return;
        }
      }
    }
  };

  focusClickedCell = (event: Event) => {
    var clickedGridCell = utils.findClosest(event.target, "[tabindex]");

    for(var row = 0; row < this.grid.length; row++) {
      for(var col = 0; col < this.grid[row].length; col++) {
        if(this.grid[row][col] === clickedGridCell) {
          this.setFocusPointer(row, col);

          if(!utils.matches(clickedGridCell, "button[aria-haspopup]")) {
            // Don't focus if it's a menu button (focus should be set to menu)
            this.focusCell(row, col);
          }

          return;
        }
      }
    }
  };


  setInitialFocus = (): void => {
    const rowData = this.containerNode.getAttribute('data-initialRow')
    const colData = this.containerNode.getAttribute('data-initialCol')

    const row = rowData === 'last' ? this.grid.length - 1 : parseInt(rowData)
    const col = colData === 'last' ? this.grid[0].length - 1 : parseInt(colData)

    this.focusCell(row, col)
  }

  setupFocusGrid (): void {
    if(!this.containerNode) return

    this.grid = []
    console.log('setupFocusGrid')

    Array.prototype.forEach.call(
      this.containerNode?.querySelectorAll(this.rowSelector),
      (row: HTMLElement) => {
        const rowCells: HTMLElement[] = [];

        Array.prototype.forEach.call(
          row?.querySelectorAll(this.colSelector),
          (cell: HTMLElement) => {
            const focusableSelector = "[tabindex]";

            if(utils.matches(cell, focusableSelector)) {
              rowCells.push(cell);
            } else {
              const focusableCell = cell.querySelector(focusableSelector);

              if(focusableCell) {
                rowCells.push(focusableCell as HTMLElement);
              }
            }
          }
        );

        if(rowCells.length) {
          this.grid.push(rowCells);
        }
      }
    );
  }

  setFocusPointer = (row: number, col: number): boolean => {

    if(!this.isValidCell(row, col)) {
      return false;
    }

    if(this.isHidden(row, col)) {
      return false;
    }

    if(!isNaN(this.focusedRow) && !isNaN(this.focusedCol)) {
      this.grid[this.focusedRow][this.focusedCol].setAttribute("tabindex", '-1');
    }

    // Disable navigation if focused on an input
    this.navigationDisabled = utils.matches(this.grid[row][col], "input");

    this.grid[row][col].setAttribute("tabindex", '0');

    this.focusedRow = row;
    this.focusedCol = col;
    console.log('setFocusPointer')

    return true;
  };

  checkFocusChange = (event: KeyboardEvent) => {
    event.stopPropagation()

    if(!event || this.navigationDisabled) {
      return;
    }

    console.log(event.key)

    this.findFocusedItem(event.target);

    var key = event.key;
    var rowCaret = this.focusedRow;
    var colCaret = this.focusedCol;
    var nextCell;


    if(rowCaret === 0 && key === 'ArrowUp') {
      this.handlers.onReachStart()
      this.setInitialCell('last', colCaret)

      return
    }

    if(rowCaret === this.grid.length - 1 && key === 'ArrowDown') {
      this.handlers.onReachEnd()
      this.setInitialCell(0, colCaret)
      return
    }

    if(rowCaret === 0 && colCaret === 0 && (key === 'ArrowLeft')) {
      this.handlers?.onReachStart()
      this.setInitialCell('last', 'last')
      return
    }

    if(rowCaret === this.grid.length - 1 && colCaret === this.grid[0].length - 1 && (key === 'ArrowRight')) {
      this.handlers?.onReachEnd()
      this.setInitialCell(0, 0)
      return
    }



    // Clear initial focus (disabling initial focus)
    this.containerNode.removeAttribute('data-initialRow')
    this.containerNode.removeAttribute('data-initialCol')

    switch(key) {
      case "ArrowUp":
        nextCell = this.getNextVisibleCell(0, -1);
        rowCaret = nextCell?.row;
        colCaret = nextCell?.col;
        break;
      case "ArrowDown":
        nextCell = this.getNextVisibleCell(0, 1);
        rowCaret = nextCell?.row;
        colCaret = nextCell?.col;
        break;
      case "ArrowLeft":
        nextCell = this.getNextVisibleCell(-1, 0);
        rowCaret = nextCell?.row;
        colCaret = nextCell?.col;
        break;
      case "ArrowRight":
        nextCell = this.getNextVisibleCell(1, 0);
        rowCaret = nextCell?.row;
        colCaret = nextCell?.col;
        break;
      case "Home":
        if(event.ctrlKey) {
          rowCaret = 0;
        }
        colCaret = 0;
        break;
      case "End":
        if(event.ctrlKey) {
          rowCaret = this.grid.length - 1;
        }
        colCaret = this.grid[this.focusedRow].length - 1;
        break;
      default:
        return;
    }

    this.focusCell(rowCaret, colCaret);
    event.preventDefault();

  };


  handleClickCell = (event: KeyboardEvent) => {
    var isClickEvent = event.type === 'click'
    var key = event.key

    if(!isClickEvent && key !== "Enter" && key !== " ") {
      return;
    }

    this.grid[this.focusedRow][this.focusedCol].click()

  }

  public clearEvents = () => {
    this.containerNode?.removeEventListener("keydown", this.checkFocusChange);
    this.containerNode?.removeEventListener("click", this.focusClickedCell);
  };

  public registerEvents = () => {
    this.clearEvents();

    this.containerNode?.addEventListener("keydown", this.checkFocusChange);
    this.containerNode?.addEventListener("keydown", this.handleClickCell);
    this.containerNode?.addEventListener("click", this.focusClickedCell);


    // if(this.shouldRestructure) {
    //   window.addEventListener("resize", this.checkRestructureGrid);
    // }
  };


}

export default Grid