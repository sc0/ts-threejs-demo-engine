import {v4 as uuid} from 'uuid';

export class UIControl {
  protected labelStr: string = "";
  public order: number = 0;

  constructor(public readonly id: string = "") {
    if (this.id.length === 0) {
      this.id = uuid();
    }
  }

  public label(label: string) {
    this.labelStr = label;
    return this;
  }

  public render() {
    return document.createElement("");
  }
}
