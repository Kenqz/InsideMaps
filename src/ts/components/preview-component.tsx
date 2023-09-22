import React, { ReactElement, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import CameraController from "../controller/camera-controller";
import Circle from "../controller/circle-controller";

interface openModal {
  onOpen: () => void;
  onCircleClick: (circleId: string) => void;
  onCircleData: (circles: Circle[]) => void;
}

const PreviewComponent = (props: openModal): ReactElement => {
  const canvas = useRef<HTMLCanvasElement>();
  const scene = useRef(new THREE.Scene());
  const cameraController = useRef<CameraController>();
  const renderer = useRef<THREE.WebGL1Renderer>();
  const mesh = useRef<THREE.Mesh>();

  // array is empty bug
  const [circles, setCircles] = useState<Circle[]>([]);

  const openModalHandler = () => {
    props.onOpen();
    const id = cameraController.current._selectedCircleId;
    props.onCircleClick(id);
  };

  useEffect(() => {
    initalizeCamera();
    intializeRenderer();
    initalizeMesh();

    renderScene();
    update();

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  const initalizeCamera = () => {
    const threeCamera = new THREE.PerspectiveCamera(
      65,
      canvas.current.clientWidth / canvas.current.clientHeight
    );

    scene.current.add(threeCamera);
    cameraController.current = new CameraController(
      threeCamera,
      openModalHandler
    );
    setCircles(cameraController.current._circles);
    props.onCircleData(circles);
  };

  const intializeRenderer = () => {
    renderer.current = new THREE.WebGL1Renderer({
      antialias: true,
      canvas: canvas.current,
    });

    renderer.current.setSize(
      canvas.current.clientWidth,
      canvas.current.clientHeight
    );
  };

  const initalizeMesh = () => {
    const sphereMesh = new THREE.SphereGeometry(1000, 25, 25);
    sphereMesh.scale(-1, 1, 1);

    const texture = new THREE.TextureLoader().load("panorama.jpg");
    const sphereMeshMaterial = new THREE.MeshBasicMaterial({
      map: texture,
    });

    mesh.current = new THREE.Mesh(sphereMesh, sphereMeshMaterial);
    scene.current.add(mesh.current);
  };

  const update = () => {
    if (!canvas.current) {
      return;
    }

    canvas.current.style.width = `${window.innerWidth}px`;
    canvas.current.style.height = `${window.innerHeight}px`;

    cameraController.current.camera.aspect =
      canvas.current.clientWidth / canvas.current.clientHeight;

    renderer.current.setSize(
      canvas.current.clientWidth,
      canvas.current.clientHeight
    );
  };

  const onMouseDown = (
    mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    cameraController.current.onMouseDown(mouseEvent, scene, circles);
  };

  const onMouseUp = (
    mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    cameraController.current.onMouseUp(mouseEvent);
  };

  const onMouseMove = (
    mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    cameraController.current.onMouseMove(mouseEvent);
  };

  const onMouseWheel = (mouseEvent: React.WheelEvent<HTMLCanvasElement>) => {
    cameraController.current.onMouseWheel(mouseEvent);
  };

  const renderScene = () => {
    requestAnimationFrame(renderScene);

    cameraController.current.update();
    renderer.current.render(scene.current, cameraController.current.camera);
  };

  return (
    <div className='preview-container'>
      <canvas
        ref={canvas}
        id='preview-canvas'
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onWheel={onMouseWheel}
        onContextMenu={(mouseEvent) => {
          mouseEvent.preventDefault();
          mouseEvent.stopPropagation();
        }}
      >
        Your browser does not support canvas HTML element!
      </canvas>
    </div>
  );
};

export default PreviewComponent;
