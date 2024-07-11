class View {
    constructor(model) {
        this.model = model;
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(40, 0, 80);
        this.camera.lookAt(0, 0, 0);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    render() {
        this.controls.update();
        this.renderer.render(this.model.scene, this.camera);
    }
}
