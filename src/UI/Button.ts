import {UIControl} from "./UIControl";

export class Button extends UIControl {
  private onClickFn: (this: void, e: Event) => void = () => {};

  public onClick(fn: (this: void, e: Event) => void) {
    this.onClickFn = fn;
    return this;
  }

  public render() {
    let button = document.createElement("button");
    button.id = this.id;
    button.onclick = this.onClickFn;
    button.innerHTML = this.labelStr;

    return button;
  }
}
