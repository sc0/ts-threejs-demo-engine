import 'reflect-metadata';
import {Screen3D} from './3d/Screen3D';
import {container} from './inversify.config';

export class App {
  constructor() {
    const screen = container.get<Screen3D>(Screen3D);
    console.info('Console initialized!');
  }
}

const app = new App();
