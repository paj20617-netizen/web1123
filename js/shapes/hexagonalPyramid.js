// 육각뿔(Hexagonal Pyramid) 3D 전개도 폴딩 모델
// 중심 정육각형 밑면 + 6개 이등변삼각형 옆면 + 조임끈(원형 루프)

export function createHexagonalPyramidModel(radius = 1.8, slantHeight = 3.6) {
  const root = new THREE.Group();
  root.name = 'HexagonalPyramidModel';

  const inRadius = radius * (Math.sqrt(3) / 2); // 내접원 반지름 (변까지의 거리)
  const maxFoldAngle = Math.acos(inRadius / slantHeight); // 완전히 닫혔을 때 각도

  // 1. 밑면 정육각형 생성
  const hexShape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) hexShape.moveTo(x, y);
    else hexShape.lineTo(x, y);
  }
  hexShape.closePath();

  const hexGeom = new THREE.ExtrudeGeometry(hexShape, { depth: 0.04, bevelEnabled: false });
  hexGeom.center();
  const hexMat = new THREE.MeshStandardMaterial({
    color: 0x7C3AED, // Violet
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const hexMesh = new THREE.Mesh(hexGeom, hexMat);
  hexMesh.rotation.x = -Math.PI / 2;
  hexMesh.castShadow = true;
  hexMesh.receiveShadow = true;

  const hexEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(hexGeom),
    new THREE.LineBasicMaterial({ color: 0x4C1D95, linewidth: 2 })
  );
  hexMesh.add(hexEdges);
  root.add(hexMesh);

  // 2. 6개 이등변삼각형 옆면 생성 및 힌지 배치
  const sideHinges = [];
  const sideTips = [];

  // 이등변삼각형 1개 지오메트리
  const triShape = new THREE.Shape();
  triShape.moveTo(-radius / 2, 0);
  triShape.lineTo(radius / 2, 0);
  triShape.lineTo(0, slantHeight);
  triShape.closePath();

  const triGeom = new THREE.ExtrudeGeometry(triShape, { depth: 0.03, bevelEnabled: false });
  // 기준점을 밑변 중앙으로 맞춤
  triGeom.translate(0, 0, 0);
  const triEdgesGeom = new THREE.EdgesGeometry(triGeom);

  const colors = [0x8B5CF6, 0xA78BFA, 0x7C3AED, 0x8B5CF6, 0xA78BFA, 0x7C3AED];

  for (let i = 0; i < 6; i++) {
    // 6개 변의 중심각: (i * 60도 + 30도)
    const midAngle = (i * Math.PI) / 3 + Math.PI / 6;

    // 변 중심 좌표
    const hx = inRadius * Math.cos(midAngle);
    const hz = inRadius * Math.sin(midAngle);

    const hinge = new THREE.Group();
    hinge.position.set(hx, 0.02, hz);
    // Y축 회전으로 변과 평행하게 정렬
    hinge.rotation.y = -midAngle + Math.PI / 2;

    const triMat = new THREE.MeshStandardMaterial({
      color: colors[i],
      roughness: 0.4,
      side: THREE.DoubleSide
    });

    const triMesh = new THREE.Mesh(triGeom, triMat);
    // 평면 상태일 때 바닥에 누워있도록 (-90도 회전)
    triMesh.rotation.x = Math.PI / 2;
    triMesh.castShadow = true;

    const triEdges = new THREE.LineSegments(
      triEdgesGeom,
      new THREE.LineBasicMaterial({ color: 0x4C1D95, linewidth: 2 })
    );
    triMesh.add(triEdges);

    // 뾰족한 끝점 마커 (실 꿰기 구멍 시각화)
    const tipMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xFBBF24 })
    );
    tipMarker.position.set(0, slantHeight - 0.15, 0.03);
    triMesh.add(tipMarker);

    hinge.add(triMesh);
    root.add(hinge);

    sideHinges.push(hinge);
    sideTips.push(tipMarker);
  }

  // 3. 조임끈(원형 루프 실)
  const loopGeom = new THREE.BufferGeometry();
  const loopMat = new THREE.LineBasicMaterial({ color: 0xEF4444, linewidth: 3 });
  const loopLine = new THREE.LineLoop(loopGeom, loopMat);
  root.add(loopLine);

  function updateFold(t) {
    const angle = t * maxFoldAngle;

    for (let i = 0; i < 6; i++) {
      // 힌지의 X축을 기준으로 안쪽으로 접어 올림
      sideHinges[i].children[0].rotation.x = Math.PI / 2 - angle;
    }

    // 6개 꼭짓점의 실 위치 계산
    const points = [];
    for (let i = 0; i < 6; i++) {
      const worldPos = new THREE.Vector3();
      sideTips[i].getWorldPosition(worldPos);
      points.push(root.worldToLocal(worldPos));
    }
    loopGeom.setFromPoints(points);
  }

  updateFold(0);

  return {
    root,
    updateFold,
    reset: () => updateFold(0)
  };
}
