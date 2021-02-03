import {inject, injectable} from "inversify";
import {Logger} from "../Utils/Logger/Logger";
import {UIContainer} from "./UIContainer";
import {UIControl} from "./UIControl";

@injectable()
export class UI {
  public uiSection!: HTMLElement | null;
  public container?: UIContainer;

  constructor(@inject('UILogger') private log: Logger) {
    this.uiSection = null;
  }

  public init() {
    this.container = new UIContainer(
      UIContainer.Direction.ROW,
      this.log,
      () => this.refreshUI()
    );

    this.log.info("Initiated successfully!");
  }

  public getValue(id: string) {
    const field = <HTMLInputElement>document.getElementById(id);

    if (!field) {
      this.log.error(`Can't get value for field "${id}" - no such field`);
      return '';
    }

    return field.value;
  }

  public addControl(control: UIControl) {
    this.container!.addControl(control)
  }

  public createContainer(direction: UIContainer.Direction) {
    const newContainer = new UIContainer(
      direction,
      this.log,
      () => (this.refreshUI())
    );
    this.container!.addControl(newContainer);
    return newContainer;
  }

  private refreshUI() {
    if (this.uiSection) {
      this.uiSection.innerHTML = '';
      this.uiSection.appendChild(this.container!.render());

    } else {
      this.log.error("Couldn't render UI");
    }
  }
}
