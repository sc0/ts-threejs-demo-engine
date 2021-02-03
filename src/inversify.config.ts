import {Container, interfaces} from "inversify";
import {DOM} from "./DOM.config"
import {Engine} from "./Engine/Engine";
import {UI} from "./UI/UI";
import {Logger} from "./Utils/Logger/Logger";
import {Screen3D} from "./3d/Screen3D";

const container = new Container();
container.bind<Logger>('AppLogger').toDynamicValue((context: interfaces.Context) => {
  return new Logger(DOM.mainLogger);
});

container.bind<Logger>('UILogger').toDynamicValue((context: interfaces.Context) => {
  return new Logger(DOM.uiLogger);
});

container.bind<Logger>('3DLogger').toDynamicValue((context: interfaces.Context) => {
  return new Logger(DOM.threejsLogger);
});

container.bind<UI>('IncompleteUI').to(UI).inSingletonScope();

container.bind<interfaces.Factory<UI>>('UIFactory').toFactory<UI>(
  (context: interfaces.Context) => {
    return (uiSection: HTMLElement) => {
      let ui = context.container.get<UI>('IncompleteUI');
      ui.uiSection = uiSection;
      ui.init();
      return ui;
    }
  }
);

container.bind<UI>(UI).toConstantValue(
  <UI>container.get<interfaces.Factory<UI>>("UIFactory")(DOM.uiSection)
);

container.bind<Engine>('IncompleteEngine').to(Engine);

container.bind<interfaces.Factory<Engine>>("EngineFactory").toFactory<Engine>(
  (context: interfaces.Context) => {
    return (canvas: HTMLCanvasElement) => {
      let engine = context.container.get<Engine>("IncompleteEngine");
      engine.canvas = canvas;
      engine.init();
      return engine;
    }
  }
);

container.bind<Engine>(Engine).toConstantValue(
  <Engine>container.get<interfaces.Factory<Engine>>("EngineFactory")(DOM.canvas)
);

container.bind<Screen3D>(Screen3D).toSelf();

export {container};
