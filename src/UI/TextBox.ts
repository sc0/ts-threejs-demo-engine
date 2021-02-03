import {UIControl} from "./UIControl";

export class TextBox extends UIControl {
  private defaultValueStr: string = '';

  public defaultValue(value: string) {
    this.defaultValueStr = value;
    return this;
  }

  public render() {
    let label = document.createElement("label");
    label.innerText = this.labelStr + "  ";

    let textbox = document.createElement("input");
    textbox.id = this.id;
    textbox.type = 'text';
    textbox.value = this.defaultValueStr;

    textbox.style.marginRight = "5px";

    label.appendChild(textbox);

    return label;
  }

}
