import * as THREE from "three";

// this class needs circle event functions
// this implementation is wrong, circle states should be implemented in circle class
// not camera class

export default class Circle {
  constructor(private position: THREE.Vector3, public id: string) {
    const geometry = new THREE.CircleGeometry(25, 32);
    const material = new THREE.MeshBasicMaterial({ color: "yellow" });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
  }

  mesh: THREE.Mesh;
}
