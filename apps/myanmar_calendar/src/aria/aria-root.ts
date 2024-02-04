class AriaRoot {
  containerNode: HTMLElement;
  navigationDisabled: boolean;

  constructor(containerNode: HTMLElement) {
    this.containerNode = containerNode
    this.navigationDisabled = false
  }


  // public clearEvents (handleKeydown: (e: KeyboardEvent) => void, handleClick: (e: Event) => void) {
  //   this.containerNode.removeEventListener("keydown", handleKeydown);
  //   this.containerNode.removeEventListener("click", handleClick);
  // };

  // public registerEvents (handleKeydown: (e: KeyboardEvent) => void, handleClick: (e: Event) => void) {
  //   this.clearEvents(handleKeydown, handleClick);

  //   this.containerNode.addEventListener("keydown", handleKeydown);
  //   this.containerNode.addEventListener("click", handleKeydown);
  // };
}

export default AriaRoot