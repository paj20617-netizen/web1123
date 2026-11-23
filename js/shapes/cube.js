// 정육면체(Cube) 3D 전개도 폴딩 모델
// Hinge 구조를 사용하여 t (0: 평면 ~ 1: 입체)에 따라 90도 회전

function createFaceMesh(size, label, bgColor = '#6366F1', textColor = '#FFFFFF') {
  // 캔버스로 라벨 텍스처 생성
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 256, 256);

  // 안쪽 테두리선
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, 240, 240);

  // 텍스트 라벨
  ctx.fillStyle = textColor;
  ctx.font = 'bold 52px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;

  const geometry = new THREE.BoxGeometry(size, size, 0.04);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.4,
    metalness: 0.1,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  // 외곽선 강조
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x1E1B4B, linewidth: 2 }));
  mesh.add(line);

  return mesh;
}

export function createCubeModel(size = 3) {
  const root = new THREE.Group();
  root.name = 'CubeModel';

  const half = size / 2;

  // 1. 바닥면 (Base Face - 1번)
  const baseMesh = createFaceMesh(size, '1 (바닥)', '#4F46E5');
  baseMesh.rotation.x = -Math.PI / 2;
  root.add(baseMesh);

  // 2. 앞면 (Front Face - 2번) : 바닥 앞쪽 모서리에서 회전
  const frontHinge = new THREE.Group();
  frontHinge.position.set(0, 0, half);
  const frontMesh = createFaceMesh(size, '2 (앞)', '#6366F1');
  frontMesh.position.set(0, 0, half);
  frontMesh.rotation.x = -Math.PI / 2;
  frontHinge.add(frontMesh);
  root.add(frontHinge);

  // 3. 뒷면 (Back Face - 3번) : 바닥 뒤쪽 모서리에서 회전
  const backHinge = new THREE.Group();
  backHinge.position.set(0, 0, -half);
  const backMesh = createFaceMesh(size, '3 (뒤)', '#818CF8');
  backMesh.position.set(0, 0, -half);
  backMesh.rotation.x = -Math.PI / 2;
  backHinge.add(backMesh);
  root.add(backHinge);

  // 4. 윗면 (Top Face - 4번, 바닥과 마주보는 면!) : 뒷면의 끝단 모서리에서 회전
  const topHinge = new THREE.Group();
  topHinge.position.set(0, 0, -size);
  const topMesh = createFaceMesh(size, '4 (윗면 - 마주봄)', '#F43F5E'); // 마주보는 면 강조 컬러
  topMesh.position.set(0, 0, -half);
  topMesh.rotation.x = -Math.PI / 2;
  topHinge.add(topMesh);
  backHinge.add(topHinge); // 계층 구조: 뒷면이 접히면 윗면도 따라감

  // 5. 좌측면 (Left Face - 5번) : 바닥 좌측 모서리에서 회전
  const leftHinge = new THREE.Group();
  leftHinge.position.set(-half, 0, 0);
  const leftMesh = createFaceMesh(size, '5 (좌)', '#A5B4FC');
  leftMesh.position.set(-half, 0, 0);
  leftMesh.rotation.x = -Math.PI / 2;
  leftHinge.add(leftMesh);
  root.add(leftHinge);

  // 6. 우측면 (Right Face - 6번) : 바닥 우측 모서리에서 회전
  const rightHinge = new THREE.Group();
  rightHinge.position.set(half, 0, 0);
  const rightMesh = createFaceMesh(size, '6 (우)', '#C7D2FE', '#312E81');
  rightMesh.position.set(half, 0, 0);
  rightMesh.rotation.x = -Math.PI / 2;
  rightHinge.add(rightMesh);
  root.add(rightHinge);

  // 실 꿰기 가이드 라인 (스트링 효과)
  const stringGeom = new THREE.BufferGeometry();
  const stringMat = new THREE.LineBasicMaterial({ color: 0xF59E0B, linewidth: 3 });
  const stringLine = new THREE.Line(stringGeom, stringMat);
  root.add(stringLine);

  function updateFold(t) {
    const angle = t * (Math.PI / 2); // 0도 ~ 90도

    frontHinge.rotation.x = -angle;
    backHinge.rotation.x = angle;
    topHinge.rotation.x = angle; // 뒷면과 함께 추가 90도 꺾여 뚜껑 덮음
    leftHinge.rotation.z = angle;
    rightHinge.rotation.z = -angle;

    // 실 위치 업데이트
    updateStringPoints(t);
  }

  function updateStringPoints(t) {
    // 힌지 끝단 포인트들을 계산하여 대각선 실 경로 시각화
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    const p3 = new THREE.Vector3();
    const p4 = new THREE.Vector3();

    leftMesh.getWorldPosition(p1);
    rightMesh.getWorldPosition(p2);
    frontMesh.getWorldPosition(p3);
    topMesh.getWorldPosition(p4);

    const points = [
      root.worldToLocal(p1.clone()),
      new THREE.Vector3(0, 0.1, 0),
      root.worldToLocal(p2.clone()),
      new THREE.Vector3(0, 0.1, 0),
      root.worldToLocal(p3.clone()),
      new THREE.Vector3(0, 0.1, 0),
      root.worldToLocal(p4.clone())
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
