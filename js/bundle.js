// =========================================================================
// 당기면 쏙! 움직이는 인터랙티브 입체도형 공작소 - Standalone All-in-One Bundle
// 정밀 기하학 폴딩(Folding) 엔진 및 불투명 종이 재질 완벽 적용
// =========================================================================

(function() {
  'use strict';

  // --- 0. LocalStorage Safe Fallback (file:// 프로토콜 보안 정책 대응) ---
  const memoryStorage = {};
  const SafeStorage = {
    getItem(key) {
      try {
        return window.localStorage ? window.localStorage.getItem(key) : memoryStorage[key] || null;
      } catch (e) {
        return memoryStorage[key] || null;
      }
    },
    setItem(key, val) {
      try {
        if (window.localStorage) window.localStorage.setItem(key, val);
        else memoryStorage[key] = val;
      } catch (e) {
        memoryStorage[key] = val;
      }
    }
  };

  // --- 1. SHAPES_DATA & DIY_GUIDE 데이터 정의 ---
  const SHAPES_DATA = {
    cube: {
      id: 'cube',
      name: '정육면체',
      engName: 'Cube',
      category: '정다면체',
      badgeColor: 'bg-indigo-500',
      summary: '6개의 합동인 정사각형 면으로 둘러싸인 대표적 정다면체',
      stats: { faces: 6, edges: 12, vertices: 8 },
      mathPrinciple: '정육면체는 모든 면이 합동인 정사각형이며, 모든 모서리의 길이가 같습니다. 전개도에서 서로 마주보는 세 쌍의 면은 평행하고 합동이어야 하며, 접었을 때 면들이 겹치지 않고 정확히 직각(90°)을 이루어야 합니다.',
      stringMechanism: '십자형/계단형 전개도 채택. 모서리 구멍을 통과하는 실을 아래로 당기면 바닥면을 기준으로 5개 면이 동시 다발적으로 접혀 올라가며 견고한 큐브가 완성됩니다.',
      specs: {
        base: '정사각형 (5 × 5cm)',
        side: '정사각형 4개 (5 × 5cm)',
        stringPoint: '대각선 방향 모서리 구멍 교차 통과',
        paperSize: '도화지 약 20 × 25cm'
      },
      photos: [
        { step: 1, label: '1단계: 펼쳐진 전개도', src: 'assets/cube_1_flat.jpg', desc: '6개의 동일한 정사각형이 연결된 십자형 전개도와 실 꿰기' },
        { step: 2, label: '2단계: 당김 과정', src: 'assets/cube_2_fold.jpg', desc: '실의 장력으로 각 면들이 90도로 솟아오르는 순간' },
        { step: 3, label: '3단계: 완성된 큐브', src: 'assets/cube_3_solid.jpg', desc: '빈틈없이 맞물려 완벽한 6면체 큐브가 형성된 모습' }
      ],
      curriculum: {
        grade: '초등 5학년 2학기',
        unit: '5. 직육면체',
        goal: '정육면체의 구성 요소(면, 모서리, 꼭짓점)와 성질을 이해하고, 전개도를 접었을 때 마주보는 면과 만나는 모서리를 찾을 수 있다.'
      },
      parentQuestions: {
        step1: '“이 평평한 네모 종이들의 실을 당기면 어떤 상자가 될까? 주사위 모양이 될까?”',
        step2: '“천천히 당겨보자! 1번 면과 4번 면(빨간색)은 접히면서 서로 마주보게 될까?”',
        step3: '“상자가 완성되었네! 서로 마주보고 있는 면들은 몇 쌍일까? 모서리는 총 몇 개가 되었니?”'
      },
      quizzes: [
        {
          id: 'cube_q1',
          question: '정육면체 전개도에서 바닥면(1번 면)과 마주보게 되는 윗면은 어떤 면일까요?',
          options: ['앞면 (2번)', '윗면 (4번 - 빨간색)', '좌측면 (5번)', '우측면 (6번)'],
          correctIndex: 1,
          explanation: '정육면체 전개도를 접으면 한 면 건너 위치한 4번(빨간색) 면이 바닥면과 서로 마주보며 평행을 이루게 됩니다.'
        },
        {
          id: 'cube_q2',
          question: '정육면체의 모서리는 모두 몇 개일까요?',
          options: ['6개', '8개', '12개', '14개'],
          correctIndex: 2,
          explanation: '정육면체는 밑면 4개, 윗면 4개, 기둥 모서리 4개로 총 12개의 모서리를 가집니다.'
        }
      ]
    },

    cylinder: {
      id: 'cylinder',
      name: '원기둥',
      engName: 'Cylinder',
      category: '회전체 / 곡면 입체',
      badgeColor: 'bg-rose-500',
      summary: '평평한 두 원형 밑면과 둥근 직사각형 옆면으로 이루어진 입체도형',
      stats: { faces: 3, edges: 2, vertices: 0 },
      mathPrinciple: '원기둥의 옆면은 펼쳤을 때 직사각형이 됩니다. 이 직사각형의 가로 길이는 밑면 원의 둘레(2 × π × r)와 정확히 일치해야 합니다. (영상 치수: 반지름 r=2.5cm일 때 원둘레 약 15.7cm, 겹침 여유분 포함 가로 18cm, 높이 9cm)',
      stringMechanism: '윗원 가장자리 구멍 → 직사각형 몸통 양 끝단 구멍 4개 → 아랫원 구멍을 관통하여 아래쪽 PULL 손잡이로 모읍니다. 실을 당기면 원의 중심과 직사각형 양 끝이 조여지며 평면이 순식간에 둥근 원기둥으로 말립니다.',
      specs: {
        base: '원 2개 (반지름 2.5cm)',
        side: '직사각형 (18 × 9cm, 겹침 여유분 포함)',
        stringPoint: '원 끝점 ↔ 몸통 양 끝단 (지그재그 관통)',
        paperSize: '도화지 약 20 × 20cm'
      },
      photos: [
        { step: 1, label: '1단계: 펼쳐진 전개도', src: 'assets/cyl_1_flat.jpg', desc: '직사각형 몸통과 상하 두 원이 펼쳐진 전개도' },
        { step: 2, label: '2단계: 당김 과정', src: 'assets/cyl_2_pull.jpg', desc: '하단 PULL 손잡이를 당기자 몸통이 둥글게 말려 올라가는 과정' },
        { step: 3, label: '3단계: 완성된 원기둥', src: 'assets/cyl_3_solid.jpg', desc: '위아래 원 밑면이 뚜껑처럼 정확히 닫혀 완성된 원기둥' }
      ],
      curriculum: {
        grade: '초등 6학년 2학기',
        unit: '6. 원기둥, 원뿔, 구',
        goal: '원기둥의 구성 요소와 전개도를 이해하고, 직사각형 옆면의 가로 길이가 밑면 원의 둘레와 같다는 기하학적 성질을 파악한다.'
      },
      parentQuestions: {
        step1: '“이 네모난 종이랑 동그라미 2개를 묶은 실을 당기면 어떤 기둥이 생길까?”',
        step2: '“네모난 종이가 스르륵 말리면서 둥근 통 모양으로 변하는 게 보이니?”',
        step3: '“펼쳤을 때 분명 평평한 네모 종이였는데, 왜 둥근 기둥을 딱 맞게 감쌀 수 있었을까?”'
      },
      quizzes: [
        {
          id: 'cyl_q1',
          question: '원기둥의 전개도에서 옆면 직사각형의 가로 길이는 무엇과 같아야 할까요?',
          options: ['밑면 원의 반지름', '밑면 원의 지름', '밑면 원의 둘레', '원기둥의 높이'],
          correctIndex: 2,
          explanation: '옆면이 둥글게 말려 밑면 원을 빈틈없이 감싸므로 직사각형의 가로 길이는 밑면 원의 둘레(2×π×r)와 같아야 합니다.'
        }
      ]
    },

    cuboid: {
      id: 'cuboid',
      name: '직육면체',
      engName: 'Cuboid',
      category: '다면체',
      badgeColor: 'bg-emerald-500',
      summary: '직사각형 6개로 둘러싸인 상자 모양의 대표 입체도형',
      stats: { faces: 6, edges: 12, vertices: 8 },
      mathPrinciple: '직육면체는 마주보는 세 쌍의 면이 각각 서로 평행하고 합동인 직사각형입니다. 마주보는 면끼리는 결코 만나지 않으며, 인접한 면들은 90도 직각으로 만납니다.',
      stringMechanism: '중심 바닥 직사각형을 기준으로 4개의 옆면과 상단 덮개면에 실을 연결합니다. 양쪽 측면 날개 구멍을 통해 연결된 두 가닥 실을 아래로 당기면 측면들이 동시에 솟아오르며 윗덮개가 닫힙니다.',
      specs: {
        base: '직사각형 (6 × 4cm)',
        side: '높이 5cm 직사각형들 (옆면 4개)',
        stringPoint: '좌우 대칭 측면 날개 구멍',
        paperSize: '도화지 약 20 × 25cm'
      },
      photos: [
        { step: 1, label: '1단계: 전개도 상태', src: 'assets/cuboid_1_flat.jpg', desc: '바닥면을 중심으로 십자/날개 형태로 펼쳐진 직육면체 도안' },
        { step: 2, label: '2단계: 조립 완성', src: 'assets/cuboid_2_solid.jpg', desc: 'PULL 탭을 당겨 면들이 평행하게 서서 완성된 직육면체 상자' }
      ],
      curriculum: {
        grade: '초등 5학년 2학기',
        unit: '5. 직육면체',
        goal: '직육면체의 겨냥도와 전개도의 대응 관계를 이해하고, 평행한 면과 수직인 면의 관계를 찾는다.'
      },
      parentQuestions: {
        step1: '“정육면체와 직육면체는 무엇이 다를까? 이 종이 상자를 접으면 어떤 모양의 선물상자가 될까?”',
        step2: '“실을 살짝 당길 때 마주보고 서는 두 면을 찾아볼래? 둘의 크기가 똑같지?”',
        step3: '“완성된 상자에서 서로 만나지 않고 나란히 있는 면은 모두 몇 쌍일까?”'
      },
      quizzes: [
        {
          id: 'cuboid_q1',
          question: '직육면체에서 서로 마주보고 있는 면은 총 몇 쌍일까요?',
          options: ['2쌍', '3쌍', '4쌍', '6쌍'],
          correctIndex: 1,
          explanation: '직육면체는 6개의 면으로 이루어져 있으며, 마주보는 면은 2개씩 짝을 이루어 총 3쌍입니다.'
        }
      ]
    },

    triangularPrism: {
      id: 'triangularPrism',
      name: '삼각기둥',
      engName: 'Triangular Prism',
      category: '각기둥',
      badgeColor: 'bg-amber-500',
      summary: '위아래 밑면이 합동인 정삼각형이고 옆면이 직사각형인 기둥형 입체',
      stats: { faces: 5, edges: 9, vertices: 6 },
      mathPrinciple: '각기둥은 두 밑면이 서로 평행하고 합동인 다각형이며, 옆면은 모두 직사각형입니다. 삼각기둥은 면이 5개, 모서리가 9개, 꼭짓점이 6개입니다.',
      stringMechanism: '3개의 직사각형 옆면이 가로로 연결되고, 중심 직사각형 상하에 정삼각형 밑면이 결합된 전개도입니다. 실을 당기면 옆면들이 삼각 튜브로 말리고 상하 삼각형이 덮이면서 견고한 삼각기둥이 됩니다.',
      specs: {
        base: '정삼각형 2개 (한 변 6cm)',
        side: '직사각형 3개 (6 × 8cm)',
        stringPoint: '삼각형 밑면 꼭짓점 ↔ 옆면 연결',
        paperSize: '도화지 약 25 × 20cm'
      },
      photos: [
        { step: 1, label: '1단계: 전개도 상태', src: 'assets/tri_1_flat.jpg', desc: '삼각형 2개와 직사각형 3개로 구성된 평면 전개도' },
        { step: 2, label: '2단계: 완성된 삼각기둥', src: 'assets/tri_2_solid.jpg', desc: '실을 당겨 3각 튜브와 상하 삼각형이 결합된 삼각기둥' }
      ],
      curriculum: {
        grade: '초등 6학년 1학기',
        unit: '2. 각기둥과 각뿔',
        goal: '각기둥의 밑면과 옆면의 성질을 알고, 전개도를 접어서 입체도형을 만드는 시각적 추론 능력을 기른다.'
      },
      parentQuestions: {
        step1: '“삼각형 2개와 네모 3개가 모여 있네. 실을 당기면 텐트 모양 상자가 될까?”',
        step2: '“양쪽 삼각형이 뚜껑처럼 접혀 내려오면서 네모들의 모서리와 딱 맞아떨어지는지 볼래?”',
        step3: '“이 기둥의 꼭짓점은 모두 몇 개일까? 삼각형 꼭짓점 3개가 위아래에 있으니 몇 개지?”'
      },
      quizzes: [
        {
          id: 'tri_q1',
          question: '삼각기둥의 꼭짓점 개수는 모두 몇 개일까요?',
          options: ['5개', '6개', '8개', '9개'],
          correctIndex: 1,
          explanation: '밑면인 삼각형에 꼭짓점이 3개씩 위아래 2개가 있으므로 총 6개입니다.'
        }
      ]
    },

    hexagonalPyramid: {
      id: 'hexagonalPyramid',
      name: '육각뿔',
      engName: 'Hexagonal Pyramid',
      category: '각뿔',
      badgeColor: 'bg-purple-500',
      summary: '정육각형 밑면과 6개의 이등변삼각형 옆면이 한 꼭짓점으로 모이는 입체',
      stats: { faces: 7, edges: 12, vertices: 7 },
      mathPrinciple: '각뿔(Pyramid)은 다각형 밑면의 각 변에서 솟아오른 삼각형들이 한 점(각뿔의 꼭짓점, Apex)에서 모여 이루어집니다. 육각뿔은 밑면 1개 + 옆면 6개로 총 7개의 면을 가집니다.',
      stringMechanism: '중심 정육각형을 둘러싼 6개의 이등변삼각형 꼭짓점에 구멍을 뚫고, 실을 원형 루프(조임끈) 형태로 꿱니다. 실을 위로 당기면 조임끈이 수축하면서 6개의 꼭짓점이 정확히 한 점(Apex)으로 모여 피라미드 구조가 완성됩니다.',
      specs: {
        base: '정육각형 (한 변 4cm)',
        side: '이등변삼각형 6개 (밑변 4cm, 높이 8cm)',
        stringPoint: '6개 꼭짓점 원형 루프 (조임끈 방식)',
        paperSize: '도화지 약 22 × 22cm'
      },
      photos: [
        { step: 1, label: '1단계: 6각 별모양 전개도', src: 'assets/hex_1_flat.jpg', desc: '중심 정육각형과 6개 이등변삼각형이 별처럼 펼쳐진 전개도' },
        { step: 2, label: '2단계: 당겨서 완성된 육각뿔', src: 'assets/hex_2_solid.jpg', desc: '실을 당겨 6개의 꼭짓점이 중앙 꼭대기로 모여 우뚝 솟은 육각뿔' }
      ],
      curriculum: {
        grade: '초등 6학년 1학기',
        unit: '2. 각기둥과 각뿔',
        goal: '각뿔의 특징(밑면 1개, 옆면은 모두 삼각형, 꼭짓점으로 모임)을 알고 각기둥과의 차이점을 설명할 수 있다.'
      },
      parentQuestions: {
        step1: '“와, 반짝반짝 별 모양 전개도네! 끈을 위로 쏙 당기면 어떤 텐트 모양이 될까?”',
        step2: '“6개의 뾰족한 삼각형 끝이 하늘로 올라가면서 가운데 한 점에서 만나는 게 보이니?”',
        step3: '“기둥 모양과 달리 위로 갈수록 뾰족해지는 입체도형을 무엇이라고 부를까?”'
      },
      quizzes: [
        {
          id: 'hex_q1',
          question: '육각뿔의 옆면 모양은 모두 어떤 도형일까요?',
          options: ['정사각형', '직사각형', '이등변삼각형', '정육각형'],
          correctIndex: 2,
          explanation: '각뿔의 옆면은 항상 삼각형이며, 정육각뿔의 옆면 6개는 모두 합동인 이등변삼각형입니다.'
        }
      ]
    }
  };

  const DIY_GUIDE = {
    materials: {
      required: [
        { id: 'm1', name: '도화지 / 색상지', desc: '180g~250g/m² 두께 권장 (너무 얇으면 찌그러지고 너무 두꺼우면 잘 안 접힘)' },
        { id: 'm2', name: '실 / 끈', desc: '면끈, 지끈, 십자수실, 얇은 나일론 끈 (마찰이 적고 매끄러우며 질긴 실)' },
        { id: 'm3', name: '측정 및 재단 도구', desc: '30cm 자, 연필, 공예용 가위 (또는 정밀 공작용 칼)' },
        { id: 'm4', name: '타공 도구', desc: '1공 펀치 (또는 송곳, 바늘)' },
        { id: 'm5', name: '스코어링 도구', desc: '칼등 또는 잉크가 다 쓴 볼펜 (접는 선 누름용)' }
      ],
      optional: [
        { id: 'o1', name: '투명 스카치 테이프', desc: '구멍 뚫을 위치 뒷면에 붙여 종이 찢어짐 방지' },
        { id: 'o2', name: '손잡이용 종이 조각', desc: '실 끝에 부착하는 작은 직사각형 PULL 손잡이 라벨' },
        { id: 'o3', name: '스케치북 / 하드보드지', desc: '바닥면을 부착하여 나만의 인터랙티브 팝업북 만들기용' }
      ]
    },
    steps: [
      {
        num: 1,
        title: '도안 작도 및 재단',
        content: '추천 규격표의 치수에 맞추어 도화지에 자와 연필로 정확한 전개도를 그립니다. 외곽선(실선)을 따라 가위나 칼로 반듯하게 오려냅니다.'
      },
      {
        num: 2,
        title: '칼선 넣기 (가장 중요한 핵심!)',
        content: '실을 당겼을 때 종이가 엉뚱한 곳에서 찌그러지지 않도록, 접히는 선(점선)을 따라 칼등이나 다 쓴 볼펜으로 자를 대고 꾹 눌러 자국을 냅니다. 자국을 낸 뒤 미리 손으로 안쪽으로 한 번씩 접었다 펴줍니다.'
      },
      {
        num: 3,
        title: '타공 및 실 꿰기',
        content: '구멍 뚫을 자리 뒤쪽에 투명 테이프를 작게 덧댄 후 1공 펀치로 타공하면 여러 번 당겨도 찢어지지 않습니다. 지정된 순서와 경로에 맞추어 실을 꿰어줍니다.'
      },
      {
        num: 4,
        title: 'PULL 손잡이 장착 및 튜닝',
        content: '모여진 실 끝에 작은 직사각형 종이(PULL)를 감싸 스테이플러나 테이프로 고정합니다. 실을 천천히 당겨보며 모든 면이 빈틈없이 맞아떨어지는지 장력을 조절합니다.'
      }
    ],
    tips: [
      {
        title: '실의 마찰 줄이기',
        desc: '보풀이 많은 털실보다는 매끄러운 왁스코팅 면실이나 지끈, 얇은 나일론 낚싯줄/공예끈을 쓸 때 훨씬 부드럽게 팝업됩니다.'
      },
      {
        title: '나만의 인터랙티브 수학 팝업북 만들기',
        desc: '스케치북의 한 페이지에 입체도형의 바닥면 1개만 양면테이프로 고정해 두면, 책장을 넘기며 끈을 당겨보는 마법 같은 팝업북이 완성됩니다.'
      }
    ]
  };

  // --- 공통 종이 메쉬 생성 유틸리티 (선명한 불투명 재질 + 테두리선) ---
  function createSolidBoxFace(w, d, colorHex, edgeColor = 0x1E293B) {
    const geom = new THREE.BoxGeometry(w, 0.04, d);
    const mat = new THREE.MeshLambertMaterial({
      color: colorHex,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const edges = new THREE.EdgesGeometry(geom);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: edgeColor, linewidth: 2 }));
    mesh.add(line);
    return mesh;
  }

  // =========================================================================
  // 2. 5대 도형 3D 정밀 기하학 폴딩 모델
  // =========================================================================

  // [도형 1] 정육면체 (Cube) - 십자형 전개도
  function createCubeModel(S = 2.6) {
    const root = new THREE.Group();
    root.name = 'CubeModel';
    const half = S / 2;

    // 1. 바닥면 (Bottom)
    const baseMesh = createSolidBoxFace(S, S, 0x4F46E5);
    baseMesh.position.set(0, 0, 0);
    root.add(baseMesh);

    // 2. 앞면 (Front) - 힌지 (0, 0, half)
    const frontHinge = new THREE.Group();
    frontHinge.position.set(0, 0, half);
    const frontMesh = createSolidBoxFace(S, S, 0x6366F1);
    frontMesh.position.set(0, 0, half);
    frontHinge.add(frontMesh);
    root.add(frontHinge);

    // 3. 뒷면 (Back) - 힌지 (0, 0, -half)
    const backHinge = new THREE.Group();
    backHinge.position.set(0, 0, -half);
    const backMesh = createSolidBoxFace(S, S, 0x818CF8);
    backMesh.position.set(0, 0, -half);
    backHinge.add(backMesh);
    root.add(backHinge);

    // 4. 윗면 (Top - 마주보는 면) - 뒷면 힌지의 끝단 (0, 0, -S)에 연결
    const topHinge = new THREE.Group();
    topHinge.position.set(0, 0, -S);
    const topMesh = createSolidBoxFace(S, S, 0xF43F5E); // 빨간색 강조
    topMesh.position.set(0, 0, -half);
    topHinge.add(topMesh);
    backHinge.add(topHinge); // 뒷면에 종속

    // 5. 좌측면 (Left) - 힌지 (-half, 0, 0)
    const leftHinge = new THREE.Group();
    leftHinge.position.set(-half, 0, 0);
    const leftMesh = createSolidBoxFace(S, S, 0x3B82F6);
    leftMesh.position.set(-half, 0, 0);
    leftHinge.add(leftMesh);
    root.add(leftHinge);

    // 6. 우측면 (Right) - 힌지 (half, 0, 0)
    const rightHinge = new THREE.Group();
    rightHinge.position.set(half, 0, 0);
    const rightMesh = createSolidBoxFace(S, S, 0x60A5FA);
    rightMesh.position.set(half, 0, 0);
    rightHinge.add(rightMesh);
    root.add(rightHinge);

    // 실 꿰기 가이드 라인
    const stringGeom = new THREE.BufferGeometry();
    const stringLine = new THREE.Line(stringGeom, new THREE.LineBasicMaterial({ color: 0xF59E0B, linewidth: 3 }));
    root.add(stringLine);

    function updateFold(t) {
      const angle = t * (Math.PI / 2); // 0 -> 90도

      frontHinge.rotation.x = -angle;
      backHinge.rotation.x = angle;
      topHinge.rotation.x = angle; // 뒷면이 선 상태에서 추가 90도 꺾여 뚜껑 덮음
      leftHinge.rotation.z = -angle;
      rightHinge.rotation.z = angle;

      const pL = new THREE.Vector3(); const pR = new THREE.Vector3(); const pT = new THREE.Vector3();
      leftMesh.getWorldPosition(pL);
      rightMesh.getWorldPosition(pR);
      topMesh.getWorldPosition(pT);

      stringGeom.setFromPoints([
        root.worldToLocal(pL),
        new THREE.Vector3(0, 0.05, 0),
        root.worldToLocal(pR),
        new THREE.Vector3(0, 0.05, 0),
        root.worldToLocal(pT)
      ]);
    }

    updateFold(0);
    return { root, updateFold, reset: () => updateFold(0) };
  }

  // [도형 2] 직육면체 (Cuboid) - 밑면 W x D, 높이 H
  function createCuboidModel(W = 3.2, H = 2.4, D = 2.0) {
    const root = new THREE.Group();
    root.name = 'CuboidModel';
    const halfW = W / 2;
    const halfD = D / 2;
    const halfH = H / 2;

    // 1. 바닥면 (W x D)
    const baseMesh = createSolidBoxFace(W, D, 0x059669);
    root.add(baseMesh);

    // 2. 앞면 (W x H)
    const frontHinge = new THREE.Group();
    frontHinge.position.set(0, 0, halfD);
    const frontMesh = createSolidBoxFace(W, H, 0x10B981);
    frontMesh.position.set(0, 0, halfH);
    frontHinge.add(frontMesh);
    root.add(frontHinge);

    // 3. 뒷면 (W x H)
    const backHinge = new THREE.Group();
    backHinge.position.set(0, 0, -halfD);
    const backMesh = createSolidBoxFace(W, H, 0x34D399);
    backMesh.position.set(0, 0, -halfH);
    backHinge.add(backMesh);
    root.add(backHinge);

    // 4. 윗면 (W x D - 마주보는 면)
    const topHinge = new THREE.Group();
    topHinge.position.set(0, 0, -H);
    const topMesh = createSolidBoxFace(W, D, 0xF43F5E);
    topMesh.position.set(0, 0, -halfD);
    topHinge.add(topMesh);
    backHinge.add(topHinge);

    // 5. 좌측면 (H x D)
    const leftHinge = new THREE.Group();
    leftHinge.position.set(-halfW, 0, 0);
    const leftMesh = createSolidBoxFace(H, D, 0x6EE7B7);
    leftMesh.position.set(-halfH, 0, 0);
    leftHinge.add(leftMesh);
    root.add(leftHinge);

    // 6. 우측면 (H x D)
    const rightHinge = new THREE.Group();
    rightHinge.position.set(halfW, 0, 0);
    const rightMesh = createSolidBoxFace(H, D, 0xA7F3D0);
    rightMesh.position.set(halfH, 0, 0);
    rightHinge.add(rightMesh);
    root.add(rightHinge);

    const stringGeom = new THREE.BufferGeometry();
    const stringLine = new THREE.Line(stringGeom, new THREE.LineBasicMaterial({ color: 0xF59E0B, linewidth: 3 }));
    root.add(stringLine);

    function updateFold(t) {
      const angle = t * (Math.PI / 2);
      frontHinge.rotation.x = -angle;
      backHinge.rotation.x = angle;
      topHinge.rotation.x = angle;
      leftHinge.rotation.z = -angle;
      rightHinge.rotation.z = angle;

      const pL = new THREE.Vector3(); const pR = new THREE.Vector3();
      leftMesh.getWorldPosition(pL); rightMesh.getWorldPosition(pR);
      stringGeom.setFromPoints([root.worldToLocal(pL), new THREE.Vector3(0, 0.05, 0), root.worldToLocal(pR)]);
    }

    updateFold(0);
    return { root, updateFold, reset: () => updateFold(0) };
  }

  // [도형 3] 삼각기둥 (Triangular Prism) - 정삼각형 한 변 S, 기둥 길이 L
  function createTriangularPrismModel(S = 2.4, L = 3.2) {
    const root = new THREE.Group();
    root.name = 'TriangularPrismModel';
    const halfS = S / 2;
    const halfL = L / 2;
    const H_tri = S * (Math.sqrt(3) / 2); // 정삼각형 높이 (~2.08)

    // 1. 가운데 바닥 옆면 (S x L)
    const baseMesh = createSolidBoxFace(S, L, 0xD97706);
    root.add(baseMesh);

    // 2. 좌측 옆면 (S x L) - 120도 접힘
    const leftHinge = new THREE.Group();
    leftHinge.position.set(-halfS, 0, 0);
    const leftMesh = createSolidBoxFace(S, L, 0xF59E0B);
    leftMesh.position.set(-halfS, 0, 0);
    leftHinge.add(leftMesh);
    root.add(leftHinge);

    // 3. 우측 옆면 (S x L) - -120도 접힘
    const rightHinge = new THREE.Group();
    rightHinge.position.set(halfS, 0, 0);
    const rightMesh = createSolidBoxFace(S, L, 0xFBBF24);
    rightMesh.position.set(halfS, 0, 0);
    rightHinge.add(rightMesh);
    root.add(rightHinge);

    // 4. 정삼각형 밑면 메쉬 생성 헬퍼
    function createTriFace(colorHex) {
      const shape = new THREE.Shape();
      shape.moveTo(-halfS, 0);
      shape.lineTo(halfS, 0);
      shape.lineTo(0, H_tri);
      shape.closePath();

      const geom = new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: false });
      const mat = new THREE.MeshLambertMaterial({ color: colorHex, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geom), new THREE.LineBasicMaterial({ color: 0x78350F, linewidth: 2 })));
      return mesh;
    }

    // 5. 상단 정삼각형 밑면 (Top Cap)
    const topHinge = new THREE.Group();
    topHinge.position.set(0, 0, -halfL);
    const topTri = createTriFace(0xB45309);
    // 평면일 때: 바닥에 누워 -Z 방향으로 뻗음
    topTri.rotation.x = -Math.PI / 2;
    topHinge.add(topTri);
    root.add(topHinge);

    // 6. 하단 정삼각형 밑면 (Bottom Cap)
    const bottomHinge = new THREE.Group();
    bottomHinge.position.set(0, 0, halfL);
    const bottomTri = createTriFace(0xB45309);
    // 평면일 때: 바닥에 누워 +Z 방향으로 뻗음
    bottomTri.rotation.x = Math.PI / 2;
    bottomHinge.add(bottomTri);
    root.add(bottomHinge);

    // 실 꿰기 가이드 라인
    const stringGeom = new THREE.BufferGeometry();
    const stringLine = new THREE.Line(stringGeom, new THREE.LineBasicMaterial({ color: 0xEF4444, linewidth: 3 }));
    root.add(stringLine);

    function updateFold(t) {
      // 옆면은 120도(2*PI/3) 꺾여서 꼭대기에서 모임
      const sideAngle = t * ((2 * Math.PI) / 3);
      // 상하 삼각형 밑면은 90도 직각으로 서서 뚜껑 닫음
      const capAngle = t * (Math.PI / 2);

      leftHinge.rotation.z = -sideAngle;
      rightHinge.rotation.z = sideAngle;

      topHinge.rotation.x = capAngle;
      bottomHinge.rotation.x = -capAngle;

      const pL = new THREE.Vector3(); const pR = new THREE.Vector3();
      leftMesh.getWorldPosition(pL); rightMesh.getWorldPosition(pR);
      stringGeom.setFromPoints([root.worldToLocal(pL), new THREE.Vector3(0, 0.05, 0), root.worldToLocal(pR)]);
    }

    updateFold(0);
    return { root, updateFold, reset: () => updateFold(0) };
  }

  // [도형 4] 육각뿔 (Hexagonal Pyramid) - 정육각형 밑면 R, 옆면 경사고 Slant
  function createHexagonalPyramidModel(R = 1.7, Slant = 3.4) {
    const root = new THREE.Group();
    root.name = 'HexagonalPyramidModel';

    const r_in = R * (Math.sqrt(3) / 2); // 내접원 반지름 (중심에서 각 변까지의 거리)
    // 닫혔을 때 바닥과 옆면이 이루는 각도
    const closeAngle = Math.acos(r_in / Slant); // 약 60~65도

    // 1. 밑면 정육각형 (XZ 평면에 수평)
    const hexShape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const x = R * Math.cos(a);
      const z = R * Math.sin(a);
      if (i === 0) hexShape.moveTo(x, z);
      else hexShape.lineTo(x, z);
    }
    hexShape.closePath();

    const hexGeom = new THREE.ExtrudeGeometry(hexShape, { depth: 0.04, bevelEnabled: false });
    const hexMesh = new THREE.Mesh(hexGeom, new THREE.MeshLambertMaterial({ color: 0x6D28D9, side: THREE.DoubleSide }));
    hexMesh.rotation.x = -Math.PI / 2;
    hexMesh.castShadow = true;
    hexMesh.receiveShadow = true;
    hexMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(hexGeom), new THREE.LineBasicMaterial({ color: 0x3B0764, linewidth: 2 })));
    root.add(hexMesh);

    // 2. 6개 이등변삼각형 옆면 생성
    const triShape = new THREE.Shape();
    triShape.moveTo(-R / 2, 0);
    triShape.lineTo(R / 2, 0);
    triShape.lineTo(0, Slant);
    triShape.closePath();
    const triGeom = new THREE.ExtrudeGeometry(triShape, { depth: 0.04, bevelEnabled: false });

    const sideHinges = [];
    const sideTips = [];
    const sideColors = [0x7C3AED, 0x8B5CF6, 0x9333EA, 0x7C3AED, 0x8B5CF6, 0x9333EA];

    for (let i = 0; i < 6; i++) {
      // 6개 변의 중심각: 30도, 90도, 150도, 210도, 270도, 330도
      const midAngle = (i * Math.PI) / 3 + Math.PI / 6;
      const hx = r_in * Math.cos(midAngle);
      const hz = r_in * Math.sin(midAngle);

      const hinge = new THREE.Group();
      hinge.position.set(hx, 0.02, hz);
      // 변과 평행하도록 회전 정렬
      hinge.rotation.y = -midAngle + Math.PI / 2;

      const triMat = new THREE.MeshLambertMaterial({ color: sideColors[i], side: THREE.DoubleSide });
      const triMesh = new THREE.Mesh(triGeom, triMat);
      triMesh.castShadow = true;
      triMesh.receiveShadow = true;
      triMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(triGeom), new THREE.LineBasicMaterial({ color: 0x3B0764, linewidth: 2 })));

      // 뾰족한 끝점 마커 (황금색 구슬 - 실 꿰기 위치)
      const tipMarker = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 12, 12),
        new THREE.MeshLambertMaterial({ color: 0xFBBF24 })
      );
      tipMarker.position.set(0, Slant, 0.02);
      triMesh.add(tipMarker);

      hinge.add(triMesh);
      root.add(hinge);

      sideHinges.push(hinge);
      sideTips.push(tipMarker);
    }

    // 3. 조임끈(원형 루프 실)
    const loopGeom = new THREE.BufferGeometry();
    const loopLine = new THREE.LineLoop(loopGeom, new THREE.LineBasicMaterial({ color: 0xEF4444, linewidth: 3 }));
    root.add(loopLine);

    function updateFold(t) {
      // t = 0 일 때: 바닥에 누움 (rotation.x = PI/2)
      // t = 1 일 때: 중앙 꼭대기 Apex로 정확히 수렴
      const curAngle = Math.PI / 2 - t * (Math.PI - closeAngle);

      for (let i = 0; i < 6; i++) {
        sideHinges[i].children[0].rotation.x = curAngle;
      }

      // 6개 꼭짓점 좌표를 모아 원형 루프 업데이트
      const pts = [];
      for (let i = 0; i < 6; i++) {
        const wPos = new THREE.Vector3();
        sideTips[i].getWorldPosition(wPos);
        pts.push(root.worldToLocal(wPos));
      }
      loopGeom.setFromPoints(pts);
    }

    updateFold(0);
    return { root, updateFold, reset: () => updateFold(0) };
  }

  // [도형 5] 원기둥 (Cylinder) - 반지름 R, 높이 H
  function createCylinderModel(R = 1.25, H = 2.8) {
    const root = new THREE.Group();
    root.name = 'CylinderModel';

    const C = 2 * Math.PI * R; // 둘레 (~7.85)
    const segs = 48;

    // A. 옆면 직사각형 롤링(Bending) 메쉬
    const planeGeom = new THREE.PlaneGeometry(C, H, segs, 1);
    const origPos = planeGeom.attributes.position.clone();

    const sideMat = new THREE.MeshLambertMaterial({
      color: 0xFB7185,
      side: THREE.DoubleSide
    });
    const sideMesh = new THREE.Mesh(planeGeom, sideMat);
    sideMesh.castShadow = true;
    sideMesh.receiveShadow = true;
    root.add(sideMesh);

    // B. 상하 원형 뚜껑
    const capGeom = new THREE.CylinderGeometry(R, R, 0.04, 32);
    const capMat = new THREE.MeshLambertMaterial({ color: 0xE11D48, side: THREE.DoubleSide });

    const topHinge = new THREE.Group();
    topHinge.position.set(0, H / 2, 0);
    const topCap = new THREE.Mesh(capGeom, capMat);
    topCap.position.set(0, R, 0);
    topHinge.add(topCap);
    root.add(topHinge);

    const bottomHinge = new THREE.Group();
    bottomHinge.position.set(0, -H / 2, 0);
    const bottomCap = new THREE.Mesh(capGeom, capMat);
    bottomCap.position.set(0, -R, 0);
    bottomHinge.add(bottomCap);
    root.add(bottomHinge);

    // 실 라인
    const stringGeom = new THREE.BufferGeometry();
    const stringLine = new THREE.Line(stringGeom, new THREE.LineBasicMaterial({ color: 0xFBBF24, linewidth: 3 }));
    root.add(stringLine);

    function updateFold(t) {
      const pos = planeGeom.attributes.position;
      if (t < 0.001) {
        for (let i = 0; i < pos.count; i++) {
          pos.setXYZ(i, origPos.getX(i), origPos.getY(i), origPos.getZ(i));
        }
      } else {
        const curR = R / Math.max(t, 0.001);
        const totalTheta = 2 * Math.PI * t;
        for (let i = 0; i < pos.count; i++) {
          const ox = origPos.getX(i);
          const oy = origPos.getY(i);
          const th = (ox / C) * totalTheta;
          pos.setXYZ(i, curR * Math.sin(th), oy, -curR * (1 - Math.cos(th)));
        }
      }
      pos.needsUpdate = true;
      planeGeom.computeVertexNormals();

      const capAngle = t * (Math.PI / 2);
      topHinge.rotation.x = -capAngle;
      bottomHinge.rotation.x = capAngle;

      const lx = pos.getX(0); const lz = pos.getZ(0);
      const rx = pos.getX(segs); const rz = pos.getZ(segs);
      stringGeom.setFromPoints([
        new THREE.Vector3(0, H / 2 + (1 - t) * R * 1.5, 0),
        new THREE.Vector3(lx, H / 2, lz),
        new THREE.Vector3(rx, H / 2, rz),
        new THREE.Vector3(lx, -H / 2, lz),
        new THREE.Vector3(rx, -H / 2, rz),
        new THREE.Vector3(0, -H / 2 - (1 - t) * R * 1.5, 0)
      ]);
    }

    updateFold(0);
    return { root, updateFold, reset: () => updateFold(0) };
  }

  // =========================================================================
  // 3. Scene3DManager (Three.js 렌더링 & 조명 환경)
  // =========================================================================
  class Scene3DManager {
    constructor(container) {
      this.container = container;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.controls = null;
      this.currentModel = null;
      this.isWireframe = false;
      this.foldProgress = 0;

      this.init();
    }

    init() {
      const width = this.container.clientWidth || 600;
      const height = this.container.clientHeight || 430;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xF8FAFC); // 눈이 편안한 Slate-50

      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.set(5.5, 6.5, 7.0);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.container.appendChild(this.renderer.domElement);

      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.1;
      this.controls.target.set(0, 0.4, 0);

      // 균일하고 선명한 조명 설정 (앞/뒤/상하 모두 밝게)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      this.scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.65);
      dirLight1.position.set(6, 12, 6);
      dirLight1.castShadow = true;
      this.scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x94A3B8, 0.35);
      dirLight2.position.set(-6, -4, -6);
      this.scene.add(dirLight2);

      const gridHelper = new THREE.GridHelper(16, 16, 0x94A3B8, 0xE2E8F0);
      gridHelper.position.y = -0.02;
      this.scene.add(gridHelper);

      window.addEventListener('resize', () => this.onResize());
      this.animate();
    }

    loadShape(shapeId) {
      if (this.currentModel) {
        this.scene.remove(this.currentModel.root);
        this.currentModel = null;
      }
      switch (shapeId) {
        case 'cube': this.currentModel = createCubeModel(2.6); break;
        case 'cuboid': this.currentModel = createCuboidModel(3.2, 2.4, 2.0); break;
        case 'triangularPrism': this.currentModel = createTriangularPrismModel(2.4, 3.2); break;
        case 'hexagonalPyramid': this.currentModel = createHexagonalPyramidModel(1.7, 3.4); break;
        case 'cylinder': this.currentModel = createCylinderModel(1.25, 2.8); break;
      }
      if (this.currentModel) {
        this.scene.add(this.currentModel.root);
        this.applyWireframe();
        this.setFoldProgress(this.foldProgress);
      }
    }

    setFoldProgress(progress) {
      this.foldProgress = Math.max(0, Math.min(1, progress));
      if (this.currentModel && typeof this.currentModel.updateFold === 'function') {
        this.currentModel.updateFold(this.foldProgress);
      }
    }

    setCameraPreset(preset) {
      if (!this.camera || !this.controls) return;
      if (preset === 'top') {
        this.camera.position.set(0, 10.5, 0.01);
        this.controls.target.set(0, 0, 0);
      } else if (preset === 'front') {
        this.camera.position.set(0, 1.2, 8.5);
        this.controls.target.set(0, 0.4, 0);
      } else {
        this.camera.position.set(5.5, 6.5, 7.0);
        this.controls.target.set(0, 0.4, 0);
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
        if (obj.isMesh && obj.material && !obj.isLineSegments) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.wireframe = this.isWireframe);
          else obj.material.wireframe = this.isWireframe;
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

  // =========================================================================
  // 4. Interactive Checklist
  // =========================================================================
  function initChecklist() {
    const container = document.getElementById('checklist-container');
    if (!container) return;

    let savedState = {};
    try {
      const raw = SafeStorage.getItem('interactive_geo_checklist_v1');
      if (raw) savedState = JSON.parse(raw);
    } catch (e) {
      savedState = {};
    }

    const allItems = [
      ...DIY_GUIDE.materials.required.map(m => ({ ...m, type: '필수' })),
      ...DIY_GUIDE.materials.optional.map(m => ({ ...m, type: '선택' }))
    ];

    function render() {
      let checkedCount = 0;
      const itemsHtml = allItems.map(item => {
        const isChecked = !!savedState[item.id];
        if (isChecked) checkedCount++;
        return `
          <label class="flex items-start gap-3 p-3 rounded-xl border ${isChecked ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'} hover:border-blue-400 transition cursor-pointer select-none">
            <input type="checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''} class="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="text-xs px-2 py-0.5 rounded font-semibold ${item.type === '필수' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}">${item.type}</span>
                <span class="font-medium text-slate-800 ${isChecked ? 'line-through text-slate-400' : ''}">${item.name}</span>
              </div>
              <p class="text-xs text-slate-500 mt-1">${item.desc}</p>
            </div>
          </label>
        `;
      }).join('');

      const progress = Math.round((checkedCount / allItems.length) * 100);

      container.innerHTML = `
        <div class="mb-4">
          <div class="flex justify-between items-center text-xs text-slate-600 mb-1">
            <span>준비 완료율</span>
            <span class="font-bold text-blue-600">${checkedCount} / ${allItems.length} (${progress}%)</span>
          </div>
          <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          ${itemsHtml}
        </div>
        <div class="mt-4 flex justify-end">
          <button id="reset-checklist-btn" class="text-xs text-slate-500 hover:text-slate-800 underline">
            체크리스트 초기화
          </button>
        </div>
      `;

      container.querySelectorAll('input[type="checkbox"]').forEach(box => {
        box.addEventListener('change', (e) => {
          const id = e.target.getAttribute('data-id');
          savedState[id] = e.target.checked;
          SafeStorage.setItem('interactive_geo_checklist_v1', JSON.stringify(savedState));
          render();
        });
      });

      const resetBtn = container.querySelector('#reset-checklist-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm('체크리스트를 모두 초기화하시겠습니까?')) {
            savedState = {};
            SafeStorage.setItem('interactive_geo_checklist_v1', JSON.stringify(savedState));
            render();
          }
        });
      }
    }
    render();
  }

  // =========================================================================
  // 5. Interactive Quiz
  // =========================================================================
  function renderQuiz(shapeId, onCorrectAnswer) {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const shape = SHAPES_DATA[shapeId];
    if (!shape || !shape.quizzes || shape.quizzes.length === 0) {
      container.innerHTML = `<p class="text-sm text-slate-500">해당 도형에 등록된 퀴즈가 없습니다.</p>`;
      return;
    }

    const quiz = shape.quizzes[0];
    container.innerHTML = `
      <div class="bg-blue-50/60 border border-blue-200 rounded-2xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">도전! 공간지각 퀴즈</span>
          <span class="text-xs text-blue-700 font-medium">${shape.curriculum.unit}</span>
        </div>
        <h4 class="font-bold text-slate-800 text-sm mb-3">Q. ${quiz.question}</h4>
        
        <div class="space-y-2 mb-3" id="quiz-options">
          ${quiz.options.map((opt, idx) => `
            <button data-index="${idx}" class="quiz-opt-btn w-full text-left p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition text-xs font-medium text-slate-700 flex items-center justify-between">
              <span>${idx + 1}. ${opt}</span>
            </button>
          `).join('')}
        </div>

        <div id="quiz-feedback" class="hidden p-3 rounded-xl text-xs"></div>
      </div>
    `;

    const buttons = container.querySelectorAll('.quiz-opt-btn');
    const feedback = container.querySelector('#quiz-feedback');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIndex = parseInt(btn.getAttribute('data-index'), 10);
        const isCorrect = selectedIndex === quiz.correctIndex;

        buttons.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('bg-emerald-100', 'border-emerald-500', 'text-emerald-900');
          feedback.className = 'mt-3 p-3 rounded-xl text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 block';
          feedback.innerHTML = `
            <div class="font-bold flex items-center gap-1 mb-1">
              <svg class="w-4 h-4 text-emerald-600 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              정답입니다! 훌륭해요! 🎉
            </div>
            <p>${quiz.explanation}</p>
            <div class="mt-2 text-blue-600 font-semibold cursor-pointer hover:underline" id="trigger-fold-anim">
              👉 3D 시뮬레이터에서 접어서 직접 확인해보기
            </div>
          `;

          if (typeof onCorrectAnswer === 'function') onCorrectAnswer(true);
          const triggerBtn = feedback.querySelector('#trigger-fold-anim');
          if (triggerBtn && typeof onCorrectAnswer === 'function') {
            triggerBtn.addEventListener('click', () => onCorrectAnswer(true, true));
          }
        } else {
          btn.classList.add('bg-rose-100', 'border-rose-500', 'text-rose-900');
          feedback.className = 'mt-3 p-3 rounded-xl text-xs bg-rose-50 border border-rose-200 text-rose-800 block';
          feedback.innerHTML = `
            <div class="font-bold flex items-center gap-1 mb-1">
              <svg class="w-4 h-4 text-rose-600 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              아쉬워요! 다시 한번 생각해보세요.
            </div>
            <p>${quiz.explanation}</p>
            <button id="retry-quiz-btn" class="mt-2 px-2.5 py-1 bg-rose-600 text-white rounded-md text-xs font-semibold hover:bg-rose-700">다시 풀기</button>
          `;
          const retryBtn = feedback.querySelector('#retry-quiz-btn');
          if (retryBtn) {
            retryBtn.addEventListener('click', () => renderQuiz(shapeId, onCorrectAnswer));
          }
        }
      });
    });
  }

  // =========================================================================
  // 6. Main InteractiveApp
  // =========================================================================
  class InteractiveApp {
    constructor() {
      this.currentShapeId = 'cube';
      this.foldProgress = 0;
      this.isPlaying = false;
      this.animationSpeed = 0.008;
      this.sceneManager = null;

      this.init();
    }

    init() {
      const container = document.getElementById('scene-container');
      if (container) {
        this.sceneManager = new Scene3DManager(container);
      }

      this.selectShape('cube');
      this.renderDIYGuide();
      initChecklist();
      this.bindEvents();
    }

    selectShape(shapeId) {
      if (!SHAPES_DATA[shapeId]) return;
      this.currentShapeId = shapeId;

      document.querySelectorAll('.shape-btn').forEach(btn => {
        const isTarget = btn.getAttribute('data-shape') === shapeId;
        if (isTarget) {
          btn.className = 'shape-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 bg-blue-600 text-white border-blue-600 shadow-sm';
        } else {
          btn.className = 'shape-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 bg-white text-slate-700 border-slate-200 hover:bg-slate-100';
        }
      });

      if (this.sceneManager) {
        this.sceneManager.loadShape(shapeId);
      }

      this.setProgress(0);
      if (this.isPlaying) this.togglePlay(false);

      this.updateShapeInfoPanel(shapeId);
      renderQuiz(shapeId, (isCorrect, autoFold) => {
        if (isCorrect && autoFold) {
          this.animateFoldTo(1.0);
        }
      });
    }

    updateShapeInfoPanel(shapeId) {
      const data = SHAPES_DATA[shapeId];
      if (!data) return;

      const shapeDisplay = document.getElementById('current-shape-display');
      if (shapeDisplay) shapeDisplay.textContent = `${data.name} (${data.engName})`;

      const titleEl = document.getElementById('shape-title');
      const engEl = document.getElementById('shape-eng');
      const badgeEl = document.getElementById('shape-category-badge');
      if (titleEl) titleEl.textContent = data.name;
      if (engEl) engEl.textContent = data.engName;
      if (badgeEl) {
        badgeEl.textContent = data.category;
        badgeEl.className = `text-xs px-2.5 py-0.5 rounded-full font-bold text-white ${data.badgeColor}`;
      }

      const fEl = document.getElementById('stat-faces');
      const eEl = document.getElementById('stat-edges');
      const vEl = document.getElementById('stat-vertices');
      if (fEl) fEl.textContent = data.stats.faces;
      if (eEl) eEl.textContent = data.stats.edges;
      if (vEl) vEl.textContent = data.stats.vertices;

      const sumEl = document.getElementById('shape-summary');
      const mathEl = document.getElementById('shape-math-principle');
      const strEl = document.getElementById('shape-string-mechanism');
      if (sumEl) sumEl.textContent = data.summary;
      if (mathEl) mathEl.textContent = data.mathPrinciple;
      if (strEl) strEl.textContent = data.stringMechanism;

      const specB = document.getElementById('spec-base');
      const specS = document.getElementById('spec-side');
      const specStr = document.getElementById('spec-string');
      if (specB) specB.textContent = data.specs.base;
      if (specS) specS.textContent = data.specs.side;
      if (specStr) specStr.textContent = data.specs.stringPoint;

      const currG = document.getElementById('curr-grade');
      const currU = document.getElementById('curr-unit');
      const currGoal = document.getElementById('curr-goal');
      if (currG) currG.textContent = data.curriculum.grade;
      if (currU) currU.textContent = data.curriculum.unit;
      if (currGoal) currGoal.textContent = data.curriculum.goal;

      const pq1 = document.getElementById('pq-step1');
      const pq2 = document.getElementById('pq-step2');
      const pq3 = document.getElementById('pq-step3');
      if (pq1) pq1.textContent = data.parentQuestions.step1;
      if (pq2) pq2.textContent = data.parentQuestions.step2;
      if (pq3) pq3.textContent = data.parentQuestions.step3;

      this.renderPhotoGallery(data.photos);
    }

    renderPhotoGallery(photos) {
      const gallery = document.getElementById('photo-gallery');
      if (!gallery) return;

      if (!photos || photos.length === 0) {
        gallery.innerHTML = '<p class="text-xs text-slate-400 col-span-3">등록된 사진이 없습니다.</p>';
        return;
      }

      gallery.innerHTML = photos.map(p => `
        <div class="photo-card border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col transition hover:shadow-md" data-step="${p.step}">
          <div class="relative aspect-square overflow-hidden bg-slate-200">
            <img src="${p.src}" alt="${p.label}" class="w-full h-full object-cover hover:scale-105 transition duration-300" onerror="this.src='assets/intro_hero.jpg'">
            <div class="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              ${p.step}단계
            </div>
          </div>
          <div class="p-2.5 flex-1 flex flex-col justify-between">
            <div class="font-bold text-xs text-slate-800 leading-tight">${p.label}</div>
            <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">${p.desc}</p>
          </div>
        </div>
      `).join('');

      this.updatePhotoHighlight();
    }

    updatePhotoHighlight() {
      const cards = document.querySelectorAll('.photo-card');
      let activeStep = 1;
      if (this.foldProgress >= 0.75) activeStep = 3;
      else if (this.foldProgress >= 0.25) activeStep = 2;
      else activeStep = 1;

      cards.forEach(card => {
        const step = parseInt(card.getAttribute('data-step'), 10);
        if (step === activeStep) {
          card.classList.add('ring-2', 'ring-blue-500', 'border-blue-500', 'bg-blue-50/30');
        } else {
          card.classList.remove('ring-2', 'ring-blue-500', 'border-blue-500', 'bg-blue-50/30');
        }
      });
    }

    renderDIYGuide() {
      const stepsList = document.getElementById('diy-steps-list');
      if (stepsList) {
        stepsList.innerHTML = DIY_GUIDE.steps.map(s => `
          <div class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div class="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              ${s.num}
            </div>
            <div>
              <div class="font-bold text-xs text-slate-900">${s.title}</div>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${s.content}</p>
            </div>
          </div>
        `).join('');
      }

      const tipsList = document.getElementById('diy-tips-list');
      if (tipsList) {
        tipsList.innerHTML = DIY_GUIDE.tips.map(t => `
          <div>
            <strong class="font-semibold text-amber-900">• ${t.title}:</strong>
            <span class="text-amber-800">${t.desc}</span>
          </div>
        `).join('');
      }
    }

    setProgress(val) {
      this.foldProgress = Math.max(0, Math.min(1, val));

      if (this.sceneManager) {
        this.sceneManager.setFoldProgress(this.foldProgress);
      }

      const percent = Math.round(this.foldProgress * 100);
      const slider = document.getElementById('pull-slider');
      const trackFill = document.getElementById('slider-track-fill');
      const badge = document.getElementById('fold-badge');

      if (slider) slider.value = percent;
      if (trackFill) trackFill.style.width = `${percent}%`;

      if (badge) {
        if (percent === 0) {
          badge.textContent = '0% 완전 펼침 (전개도)';
          badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200';
        } else if (percent === 100) {
          badge.textContent = '100% 입체 완성! 🎉';
          badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300';
        } else {
          badge.textContent = `${percent}% 접히는 중...`;
          badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300';
        }
      }

      this.updatePhotoHighlight();
    }

    animateFoldTo(targetVal) {
      const startVal = this.foldProgress;
      const duration = 1200;
      const startTime = performance.now();

      const stepAnim = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        this.setProgress(startVal + (targetVal - startVal) * ease);

        if (progress < 1) {
          requestAnimationFrame(stepAnim);
        }
      };
      requestAnimationFrame(stepAnim);
    }

    togglePlay(forcedState) {
      this.isPlaying = typeof forcedState === 'boolean' ? forcedState : !this.isPlaying;
      const playBtn = document.getElementById('play-pause-btn');
      const icon = document.getElementById('play-icon');
      const text = document.getElementById('play-text');

      if (this.isPlaying) {
        if (icon) icon.textContent = '⏸';
        if (text) text.textContent = '정지';
        if (playBtn) playBtn.className = 'flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm';
        this.runPlayLoop();
      } else {
        if (icon) icon.textContent = '▶';
        if (text) text.textContent = '자동 당기기';
        if (playBtn) playBtn.className = 'flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm';
      }
    }

    runPlayLoop() {
      if (!this.isPlaying) return;
      let next = this.foldProgress + this.animationSpeed;
      if (next > 1) next = 0;
      this.setProgress(next);
      requestAnimationFrame(() => this.runPlayLoop());
    }

    bindEvents() {
      document.querySelectorAll('.shape-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectShape(btn.getAttribute('data-shape'));
        });
      });

      const slider = document.getElementById('pull-slider');
      if (slider) {
        slider.addEventListener('input', (e) => {
          if (this.isPlaying) this.togglePlay(false);
          this.setProgress(parseFloat(e.target.value) / 100);
        });
      }

      const playBtn = document.getElementById('play-pause-btn');
      if (playBtn) {
        playBtn.addEventListener('click', () => this.togglePlay());
      }

      document.querySelectorAll('.quick-step-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (this.isPlaying) this.togglePlay(false);
          this.animateFoldTo(parseFloat(btn.getAttribute('data-target')) / 100);
        });
      });

      document.getElementById('view-preset-perspective')?.addEventListener('click', () => {
        this.sceneManager?.setCameraPreset('perspective');
      });
      document.getElementById('view-preset-top')?.addEventListener('click', () => {
        this.sceneManager?.setCameraPreset('top');
      });
      document.getElementById('view-preset-front')?.addEventListener('click', () => {
        this.sceneManager?.setCameraPreset('front');
      });
      document.getElementById('toggle-wireframe-btn')?.addEventListener('click', () => {
        const isWire = this.sceneManager?.toggleWireframe();
        const btn = document.getElementById('toggle-wireframe-btn');
        if (btn) {
          btn.classList.toggle('bg-blue-100', isWire);
          btn.classList.toggle('text-blue-700', isWire);
        }
      });

      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tabKey = btn.getAttribute('data-tab');
          document.querySelectorAll('.tab-btn').forEach(b => {
            b.className = 'tab-btn flex-1 py-2 rounded-xl transition text-center text-slate-600 hover:bg-slate-100';
          });
          btn.className = 'tab-btn flex-1 py-2 rounded-xl transition text-center bg-blue-600 text-white shadow-sm';

          document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
          const target = document.getElementById(`tab-content-${tabKey}`);
          if (target) target.classList.remove('hidden');
        });
      });
    }
  }

  // DOM 로드 시 인스턴스 초기화
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => { window.app = new InteractiveApp(); });
  } else {
    window.app = new InteractiveApp();
  }

})();
