// 삼각기둥(Triangular Prism) 3D 전개도 폴딩 모델

function createRectFaceMesh(width, length, label, bgColor = '#F59E0B', textColor = '#FFFFFF') {
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
  const geometry = new THREE.BoxGeometry(width, length, 0.04);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.4,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x78350F, linewidth: 2 }));
  mesh.add(line);

  return mesh;
}

function createTriangleMesh(side, label, bgColor = '#D97706') {
  const h = (Math.sqrt(3) / 2) * side;
  const shape = new THREE.Shape();
  // 정삼각형: 꼭짓점이 위로 향하도록
  shape.moveTo(-side / 2, 0);
  shape.lineTo(side / 2, 0);
  shape.lineTo(0, h);
  shape.closePath();

  const extrudeSettings = { depth: 0.04, bevelEnabled: false };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(bgColor),
    roughness: 0.4,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x78350F, linewidth: 2 }));
  mesh.add(line);

  return { mesh, h };
}

export function createTriangularPrismModel(side = 2.6, length = 3.6) {
  const root = new THREE.Group();
  root.name = 'TriangularPrismModel';

  const halfS = side / 2;
  const halfL = length / 2;

  // 1. 가운데 바닥 옆면 (Base Rect)
  const baseMesh = createRectFaceMesh(side, length, '옆면 (가운데)', '#D97706');
  baseMesh.rotation.x = -Math.PI / 2;
  root.add(baseMesh);

  // 2. 좌측 옆면 (Left Rect) - 접힐 때 120도 회전
  const leftHinge = new THREE.Group();
  leftHinge.position.set(-halfS, 0, 0);
  const leftMesh = createRectFaceMesh(side, length, '옆면 (좌)', '#F59E0B');
  leftMesh.position.set(-halfS, 0, 0);
  leftMesh.rotation.x = -Math.PI / 2;
  leftHinge.add(leftMesh);
  root.add(leftHinge);

  // 3. 우측 옆면 (Right Rect) - 접힐 때 -120도 회전
  const rightHinge = new THREE.Group();
  rightHinge.position.set(halfS, 0, 0);
  const rightMesh = createRectFaceMesh(side, length, '옆면 (우)', '#FBBF24', '#78350F');
  rightMesh.position.set(halfS, 0, 0);
  rightMesh.rotation.x = -Math.PI / 2;
  rightHinge.add(rightMesh);
  root.add(rightHinge);

  // 4. 상단 정삼각형 밑면 (Top Triangle Cap)
  const topHinge = new THREE.Group();
  topHinge.position.set(0, 0, -halfL);
  const topTri = createTriangleMesh(side, '밑면 1', '#B45309');
  topTri.mesh.rotation.x = -Math.PI / 2;
  topTri.mesh.position.set(0, 0, -topTri.h / 2);
  topHinge.add(topTri.mesh);
  root.add(topHinge);

  // 5. 하단 정삼각형 밑면 (Bottom Triangle Cap)
  const bottomHinge = new THREE.Group();
  bottomHinge.position.set(0, 0, halfL);
  const bottomTri = createTriangleMesh(side, '밑면 2', '#B45309');
  bottomTri.mesh.rotation.x = -Math.PI / 2;
  bottomTri.mesh.rotation.z = Math.PI; // 반대 방향으로 뾰족하게
  bottomTri.mesh.position.set(0, 0, topTri.h / 2);
  bottomHinge.add(bottomTri.mesh);
  root.add(bottomHinge);

  // 실 꿰기 라인
  const stringGeom = new THREE.BufferGeometry();
  const stringMat = new THREE.LineBasicMaterial({ color: 0xEF4444, linewidth: 3 });
  const stringLine = new THREE.Line(stringGeom, stringMat);
  root.add(stringLine);

  function updateFold(t) {
    // 3각 프리즘의 옆면은 120도(2 * Math.PI / 3) 접힘
    const sideAngle = t * ((2 * Math.PI) / 3);
    const capAngle = t * (Math.PI / 2);

    leftHinge.rotation.z = sideAngle;
    rightHinge.rotation.z = -sideAngle;

    topHinge.rotation.x = capAngle;
    bottomHinge.rotation.x = -capAngle;

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
