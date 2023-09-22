import * as THREE from "three";
import Circle from "./circle-controller";
import { CircleData } from "src/redux/dataSlice";

type OpenModalCallback = () => void;

export default class CameraController {
  public _circleData: CircleData | null = null;
  private _camera: THREE.PerspectiveCamera;
  public _circles: Circle[] = [];
  private _mousePreviousX: number = 0;
  private _mousePreviousY: number = 0;
  private _isMouseDown: boolean = false;
  private _rotationSpeed: number = 0.001;
  private _openModalCallback: OpenModalCallback;
  public _selectedCircleId: string | null = null;

  constructor(
    camera: THREE.PerspectiveCamera,
    openModalCallback: OpenModalCallback
  ) {
    this._camera = camera;
    this._openModalCallback = openModalCallback;
  }

  get camera() {
    return this._camera;
  }

  public get selectedCircleId() {
    return this._selectedCircleId;
  }

  public update() {}

  public onMouseDown(
    mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    scene: React.MutableRefObject<THREE.Scene>,
    circles: Circle[] = []
  ) {
    this._isMouseDown = true;
    this._mousePreviousX = mouseEvent.clientX;
    this._mousePreviousY = mouseEvent.clientY;

    const canvasBounds = mouseEvent.currentTarget.getBoundingClientRect();
    const mousePosition = new THREE.Vector2(
      ((mouseEvent.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1,
      -((mouseEvent.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mousePosition, this._camera);
    const intersects = raycaster.intersectObject(scene.current.children[1]);

    if (intersects.length > 0 && mouseEvent.button == 2) {
      const circlePosition = intersects[0].point;
      const circleId = `circle_${this._circles.length}`;
      const circle = new Circle(circlePosition, circleId);
      const id = (this._selectedCircleId = circleId);

      this._circleData = {
        id: id,
        title: "",
        description: "",
        file: "",
      };

      const clickedCircle = circles.filter(
        (circle) => circle.mesh !== intersects[0].object
      );

      if (clickedCircle) {
        this._openModalCallback();
      }
      this._circles.push(circle);
      scene.current.add(circle.mesh);
    }
  }

  public onMouseUp(
    mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    this._isMouseDown = false;
  }

  public onMouseMove(
    mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    if (this._isMouseDown) {
      const deltaX = mouseEvent.clientX - this._mousePreviousX;
      const deltaY = mouseEvent.clientY - this._mousePreviousY;

      this._camera.rotation.y += deltaX * this._rotationSpeed;
      this._camera.rotation.x += deltaY * this._rotationSpeed;
    }

    this._camera.rotation.x = Math.max(
      -Math.PI / 2 + 0.01,
      Math.min(Math.PI / 2 - 0.01, this._camera.rotation.x)
    );
    this._mousePreviousX = mouseEvent.clientX;
    this._mousePreviousY = mouseEvent.clientY;
  }

  public onMouseWheel(wheelEvent: React.WheelEvent<HTMLCanvasElement>) {
    const delta = wheelEvent.deltaY;
    const zoomSpeed = 0.2;
    this._camera.position.z += delta * zoomSpeed;
  }
}
