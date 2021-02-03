import {Logger} from "../Utils/Logger/Logger";
import {UIControl} from "./UIControl";

export class UIContainer extends UIControl {
  private nextOrder = 0;
  public controls: UIControl[] = [];

  public constructor(public direction: UIContainer.Direction,
    protected log: Logger,
    private refresh: () => void) {
    super();
  }


  public addControl(control: UIControl) {
    control.order = this.nextOrder++;
    this.controls.push(control);
    this.refresh();
  }


  /**
    @param control - either id or control object to remove
  */
  public removeControl(control: string | UIControl) {
    let id = "";
    if (control instanceof UIControl) {
      id = this.controls.filter(b => b.id === control.id).map(b => b.id)[0];

      if (!id) {
        this.log.error("No control \"" + id + "\" found to be removed");
        return;
      }
    } else {
      id = control;
    }

    const idx = this.controls.map(b => b.id).indexOf(id);
    if (idx < 0) {
      this.log.error("No control \"" + id + "\" found to be removed");
      return;
    }
    this.controls.splice(idx, 1);
    this.refresh();
  }


  public render() {
    let container = document.createElement("div");
    container.style.display = 'flex';

    if (this.direction === UIContainer.Direction.ROW) {
      container.style.flexDirection = 'row';
    } else {
      container.style.flexDirection = 'column';
      container.style.maxWidth = '250px';
    }

    for (let control of this.controls) {
      container.appendChild(control.render());
    }

    return container;
  }
}


export namespace UIContainer {
  export enum Direction {
    ROW,
    COLUMN
  }
}


