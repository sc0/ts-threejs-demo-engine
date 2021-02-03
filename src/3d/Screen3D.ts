import {inject, injectable} from "inversify";
import {Engine} from "../Engine/Engine";
import {Button} from "../UI/Button";
import {TextBox} from "../UI/TextBox";
import {UI} from "../UI/UI";
import {UIContainer} from "../UI/UIContainer";
import {Logger} from "../Utils/Logger/Logger";

@injectable()
export class Screen3D {

  constructor(@inject('AppLogger') private log: Logger,
    private ui: UI,
    private engine: Engine) {

    this.log.info("Application initialized!");
    this.engine.resizeCanvas(1024, 768);
    this.addUI();
  }


  private addUI() {
    const uiContainer = this.ui.createContainer(UIContainer.Direction.COLUMN);

    uiContainer.addControl(new TextBox('3d-window-width').label('Width').defaultValue("1024"));
    uiContainer.addControl(new TextBox('3d-window-height').label('Height').defaultValue("768"));
    uiContainer.addControl(
      new Button()
        .label("Resize me!")
        .onClick(() => {
          const width = this.ui.getValue('3d-window-width');
          const height = this.ui.getValue('3d-window-height');
          this.log.info(`Resized to width: ${width}, height: ${height}`);
          this.engine.resizeCanvas(+width, +height);
        })
    );
  }
}
