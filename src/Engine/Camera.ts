import * as THREE from "three";

export class Camera {

  private camera: THREE.PerspectiveCamera;

  constructor(
    private fov: number,
    private aspect: number,
    private near: number,
    private far: number
  ) {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.z = 2;
  }

  public getCamera() {
    return this.camera;
  }

  public adjustCameraAfterResize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

}
