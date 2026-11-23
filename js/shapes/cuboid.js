// 직육면체(Cuboid) 3D 전개도 폴딩 모델

function createFaceMesh(width, depth, label, bgColor = '#10B981', textColor = '#FFFFFF') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, 240, 240);

  ctx.fillStyle = textColor;
  ctx.font = 'bold 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;

  const geometry = new THREE.BoxGeometry(width, depth, 0.04);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.4,
    metalness: 0.1,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x064E3B, linewidth: 2 }));
  mesh.add(line);

  return mesh;
}

export function createCuboidModel(w = 3.6, h = 3.0, d = 2.4) {
  const root = new THREE.Group();
  root.name = 'CuboidModel';

  const halfW = w / 2;
  const halfD = d / 2;
  const halfH = h / 2;

  // 1. 바닥면 (w x d)
  const baseMesh = createFaceMesh(w, d, '바닥면', '#059669');
  baseMesh.rotation.x = -Math.PI / 2;
  root.add(baseMesh);

  // 2. 앞면 (w x h)
  const frontHinge = new THREE.Group();
  frontHinge.position.set(0, 0, halfD);
  const frontMesh = createFaceMesh(w, h, '앞면', '#10B981');
  frontMesh.position.set(0, 0, halfH);
  frontMesh.rotation.x = -Math.PI / 2;
  frontHinge.add(frontMesh);
  root.add(frontHinge);

  // 3. 뒷면 (w x h)
  const backHinge = new THREE.Group();
  backHinge.position.set(0, 0, -halfD);
  const backMesh = createFaceMesh(w, h, '뒷면', '#34D399');
  backMesh.position.set(0, 0, -halfH);
  backMesh.rotation.x = -Math.PI / 2;
  backHinge.add(backMesh);
  root.add(backHinge);

  // 4. 윗면 (w x d, 바닥면과 마주봄)
  const topHinge = new THREE.Group();
  topHinge.position.set(0, 0, -h);
  const topMesh = createFaceMesh(w, d, '윗면 (마주봄)', '#F43F5E');
  topMesh.position.set(0, 0, -halfD);
  topMesh.rotation.x = -Math.PI / 2;
  topHinge.add(topMesh);
  backHinge.add(topHinge);

  // 5. 좌측면 (h x d)
  const leftHinge = new THREE.Group();
  leftHinge.position.set(-halfW, 0, 0);
  const leftMesh = createFaceMesh(h, d, '좌측면', '#6EE7B7', '#064E3B');
  leftMesh.position.set(-halfH, 0, 0);
  leftMesh.rotation.x = -Math.PI / 2;
  leftHinge.add(leftMesh);
  root.add(leftHinge);

  // 6. 우측면 (h x d)
  const rightHinge = new THREE.Group();
  rightHinge.position.set(halfW, 0, 0);
  const rightMesh = createFaceMesh(h, d, '우측면', '#A7F3D0', '#064E3B');
  rightMesh.position.set(halfH, 0, 0);
  rightMesh.rotation.x = -Math.PI / 2;
  rightHinge.add(rightMesh);
  root.add(rightHinge);

  // 실 꿰기 가이드 라인
  const stringGeom = new THREE.BufferGeometry();
  const stringMat = new THREE.LineBasicMaterial({ color: 0xF59E0B, linewidth: 3 });
  const stringLine = new THREE.Line(stringGeom, stringMat);
  root.add(stringLine);

  function updateFold(t) {
    const angle = t * (Math.PI / 2);

    frontHinge.rotation.x = -angle;
    backHinge.rotation.x = angle;
    topHinge.rotation.x = angle;
    leftHinge.rotation.z = angle;
    rightHinge.rotation.z = -angle;

    // 실 포인트 업데이트
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    leftMesh.getWorldPosition(p1);
    rightMesh.getWorldPosition(p2);

    const points = [
      root.worldToLocal(p1.clone()),
      new THREE.Vector3(0, 0.1, 0),
      root.worldToLocal(p2.clone())
    ];
    stringGeom.setFromPoints(points);
  }

  updateFold(0);

  return {
    root,
    updateFold,
    reset: () => updateFold(0)
  };
}
