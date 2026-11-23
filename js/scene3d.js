// Three.js 3D 뷰포트 및 씬 매니저 모듈
import { createCubeModel } from './shapes/cube.js';
import { createCuboidModel } from './shapes/cuboid.js';
import { createTriangularPrismModel } from './shapes/triangularPrism.js';
import { createHexagonalPyramidModel } from './shapes/hexagonalPyramid.js';
import { createCylinderModel } from './shapes/cylinder.js';

export class Scene3DManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.currentModel = null;
    this.currentShapeId = null;
    this.isWireframe = false;
    this.foldProgress = 0; // 0 (평면) ~ 1 (완전 입체)

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 500;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xF1F5F9); // Slate-100 연한 배경

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(6, 7, 7.5);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.1; // 바닥 아래로 너무 내려가지 않도록
    this.controls.minDistance = 3;
    this.controls.maxDistance = 25;
    this.controls.target.set(0, 0.5, 0);

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(8, 14, 8);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    dirLight1.shadow.camera.near = 0.5;
    dirLight1.shadow.camera.far = 30;
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x93C5FD, 0.3); // 푸른 보조광
    dirLight2.position.set(-8, 6, -8);
    this.scene.add(dirLight2);

    // 6. Ground & Grid
    const gridHelper = new THREE.GridHelper(16, 16, 0x94A3B8, 0xCBD5E1);
    gridHelper.position.y = -0.02;
    this.scene.add(gridHelper);

    // 7. Event listeners
    window.addEventListener('resize', () => this.onResize());

    // 8. Animation Loop
    this.animate();
  }

  loadShape(shapeId) {
    if (this.currentModel) {
      this.scene.remove(this.currentModel.root);
      this.currentModel = null;
    }

    this.currentShapeId = shapeId;

    switch (shapeId) {
      case 'cube':
        this.currentModel = createCubeModel(2.8);
        break;
      case 'cuboid':
        this.currentModel = createCuboidModel(3.6, 2.8, 2.2);
        break;
      case 'triangularPrism':
        this.currentModel = createTriangularPrismModel(2.6, 3.4);
        break;
      case 'hexagonalPyramid':
        this.currentModel = createHexagonalPyramidModel(1.7, 3.5);
        break;
      case 'cylinder':
        this.currentModel = createCylinderModel(1.2, 3.0);
        break;
      default:
        console.warn('Unknown shape:', shapeId);
        return;
    }

    this.scene.add(this.currentModel.root);
    this.applyWireframe();
    this.setFoldProgress(this.foldProgress);
  }

  setFoldProgress(progress) {
    this.foldProgress = Math.max(0, Math.min(1, progress));
    if (this.currentModel && typeof this.currentModel.updateFold === 'function') {
      this.currentModel.updateFold(this.foldProgress);
    }
  }

  setCameraPreset(preset) {
    if (!this.camera || !this.controls) return;

    switch (preset) {
      case 'top':
        this.camera.position.set(0, 11, 0.01);
        this.controls.target.set(0, 0, 0);
        break;
      case 'front':
        this.camera.position.set(0, 1.5, 9);
        this.controls.target.set(0, 0.5, 0);
        break;
      case 'perspective':
      default:
        this.camera.position.set(6, 7, 7.5);
        this.controls.target.set(0, 0.5, 0);
        break;
    }
    this.controls.update();
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    this.applyWireframe();
    return this.isWireframe;
  }

  applyWireframe() {
    if (!this.currentModel) return;
    this.currentModel.root.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.wireframe = this.isWireframe);
        } else {
          obj.material.wireframe = this.isWireframe;
        }
      }
    });
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.controls) this.controls.update();
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
