class Renderer {
  constructor(scene, vp){
    this.camera = new THREE.PerspectiveCamera(70, vp.clientWidth/vp.clientHeight, 0.1, 2000);
    this.camera.position.set(20,20,20);

    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setSize(vp.clientWidth, vp.clientHeight);
    vp.appendChild(this.renderer.domElement);

    this.scene = scene;
  }

  render(){
    this.renderer.render(this.scene, this.camera);
  }
}

