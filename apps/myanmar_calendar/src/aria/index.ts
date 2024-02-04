import Grid, {AriaGridProps} from "./aria-grid"

const aria = {
  grid: (containerNode: HTMLElement, props: AriaGridProps) => {
    const grid = new Grid(containerNode, props)

    return {
      registerEvents: grid.registerEvents,
      clearEvents: grid.clearEvents,
    }
  }
}

export default aria