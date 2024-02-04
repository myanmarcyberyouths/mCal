import AriaRoot from "./aria-root";
import {gridSelector} from "./constants.aria";
import utils from "./utils.aria";

class List extends AriaRoot {

  list: HTMLElement[];
  selector: string;
  focusedRow: number;

  constructor(containerNode: HTMLElement, selector: string) {
    super(containerNode)

    this.selector = selector
    this.list = []

    this.setupFocusList()
  }

  private setupFocusList () {

  }

}

export default List