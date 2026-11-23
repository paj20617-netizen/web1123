// 원기둥(Cylinder) 3D 전개도 폴딩 및 롤링(Bending) 모델
// 평면 직사각형 몸통이 둥글게 말리고, 위아래 원형 밑면이 90도 꺾여 닫히는 메커니즘

export function createCylinderModel(radius = 1.3, height = 3.2) {
  const root = new THREE.Group();
  root.name = 'CylinderModel';

  const circumference = 2 * Math.PI * radius; // 옆면 직사각형 가로 길이
  const segments = 48; // 부드러운 롤링 곡면 분할 수

  // 1. 옆면 직사각형 롤링 메쉬
  // PlaneGeometry(width, height, widthSegments, heightSegments)
  const planeGeom = new THREE.PlaneGeometry(circumference, height, segments, 1);
  const origPositions = planeGeom.attributes.position.clone();

  // 옆면 캔버스 텍스처 (격자 및 PULL 안내)
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FB7185';
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 500, 244);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('옆면 직사각형 (가로 = 밑면 둘레 2πr)', 256, 135);

  const texture = new THREE.CanvasTexture(canvas);
  const sideMat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.4,
    side: THREE.DoubleSide
  });

  const sideMesh = new THREE.Mesh(planeGeom, sideMat);
  sideMesh.castShadow = true;
  root.add(sideMesh);

  // 2. 상단 원 밑면 (Top Cap)
  const capGeom = new THREE.CylinderGeometry(radius, radius, 0.04, 32);
  const capMat = new THREE.MeshStandardMaterial({
    color: 0xE11D48,
    roughness: 0.3
  });

  // 상단 힌지: 직사각형 상단 중앙에 위치
  const topHinge = new THREE.Group();
  topHinge.position.set(0, height / 2, 0);
  const topCap = new THREE.Mesh(capGeom, capMat);
  // 평면 상태일 때는 수직으로 위쪽에 누워있음
  topCap.position.set(0, radius, 0);
  topHinge.add(topCap);
  root.add(topHinge);

  // 3. 하단 원 밑면 (Bottom Cap)
  const bottomHinge = new THREE.Group();
  bottomHinge.position.set(0, -height / 2, 0);
  const bottomCap = new THREE.Mesh(capGeom, capMat);
  bottomCap.position.set(0, -radius, 0);
  bottomHinge.add(bottomCap);
  root.add(bottomHinge);

  // 4. 실(String) 라인
  const stringGeom = new THREE.BufferGeometry();
  const stringMat = new THREE.LineBasicMaterial({ color: 0xFBBF24, linewidth: 3 });
  const stringLine = new THREE.Line(stringGeom, stringMat);
  root.add(stringLine);

  function updateFold(t) {
    // A. 직사각형 롤링(Bending) 변형
    const pos = planeGeom.attributes.position;
    const orig = origPositions;

    if (t < 0.001) {
      // 완전 평면
      for (let i = 0; i < pos.count; i++) {
        pos.setXYZ(i, orig.getX(i), orig.getY(i), orig.getZ(i));
      }
    } else {
      // 곡률 반경 R_t 및 중심각 회전
      const curR = radius / Math.max(t, 0.001);
      const curThetaTotal = 2 * Math.PI * t;

      for (let i = 0; i < pos.count; i++) {
        const origX = orig.getX(i);
        const origY = orig.getY(i);

        // 원호 중심각 theta: -curThetaTotal/2 ~ +curThetaTotal/2
        const theta = (origX / circumference) * curThetaTotal;

        const newX = curR * Math.sin(theta);
        const newZ = curR * (1 - Math.cos(theta));

        pos.setXYZ(i, newX, origY, -newZ);
      }
    }
    pos.needsUpdate = true;
    planeGeom.computeVertexNormals();

    // B. 상하 원형 밑면 뚜껑 90도 회전
    const capAngle = t * (Math.PI / 2);
    // 0일 때 0도 (위/아래로 펼쳐짐), 1일 때 90도 꺾여 수평으로 원통 뚜껑 닫음
    topHinge.rotation.x = -capAngle;
    bottomHinge.rotation.x = capAngle;

    // C. 실 포인트 계산 (양 끝단과 상/하 뚜껑 연결)
    const leftEdgeX = pos.getX(0);
    const leftEdgeZ = pos.getZ(0);
    const rightEdgeX = pos.getX(segments);
    const rightEdgeZ = pos.getZ(segments);

    const stringPoints = [
      new THREE.Vector3(0, height / 2 + (1 - t) * radius * 2, 0), // 상단 뚜껑
      new THREE.Vector3(leftEdgeX, height / 2, leftEdgeZ),
      new THREE.Vector3(rightEdgeX, height / 2, rightEdgeZ),
      new THREE.Vector3(leftEdgeX, -height / 2, leftEdgeZ),
      new THREE.Vector3(rightEdgeX, -height / 2, rightEdgeZ),
      new THREE.Vector3(0, -height / 2 - (1 - t) * radius * 2, 0) // 하단 뚜껑
    ];
    stringGeom.setFromPoints(stringPoints);
  }

  updateFold(0);

  return {
    root,
    updateFold,
    reset: () => updateFold(0)
  };
}
