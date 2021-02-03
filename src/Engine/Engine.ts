import {inject, injectable} from "inversify";
import * as THREE from "three";
import {UI} from "../UI/UI";
import {Logger} from "../Utils/Logger/Logger";
import {Camera} from "./Camera";

@injectable()
export class Engine {

  public renderer!: THREE.Renderer;
  public camera!: Camera;
  public scene!: THREE.Scene;
  public cube!: THREE.Mesh;
  public light!: THREE.DirectionalLight;
  public canvas!: HTMLCanvasElement | null;

  constructor(
    @inject('3DLogger') private log: Logger, private ui: UI) {
    this.canvas = null;
  }

  public init() {
    const canvas = <HTMLCanvasElement>this.canvas;

    if (canvas) {
      this.log.info('Instantiated successfully');
    }
    this.renderer = new THREE.WebGLRenderer({canvas});
    this.camera = new Camera(75, 2, 0.1, 5);
    this.scene = new THREE.Scene();

    this.addLighting();

    const box = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

    this.cube = new THREE.Mesh(box, material);

    this.scene.add(this.cube);
    this.renderer.render(this.scene, this.camera.getCamera());


    this.log.info("Cube rendered");
    requestAnimationFrame(this.render.bind(this));
  }

  private addLighting() {
    const color = 0xFFFFFF;
    const intensity = 1;
    this.light = new THREE.DirectionalLight(color, intensity);
    this.light.position.set(-1, 2, 4);
    this.scene.add(this.light);
  }


  private render(time: number) {
    time *= 0.001;
    this.cube.rotation.x = time;
    this.cube.rotation.y = time;

    this.renderer.render(this.scene, this.camera.getCamera());
    requestAnimationFrame(this.render.bind(this));
  }


  public resizeCanvas(width: number, height: number) {
    if (this.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
    }

    this.camera.adjustCameraAfterResize(width, height);
    this.renderer.setSize(width, height);

  }
}
