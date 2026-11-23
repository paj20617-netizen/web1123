// 5대 입체도형 메타데이터, 교과 연계, DIY 가이드 및 퀴즈 데이터

export const SHAPES_DATA = {
  cube: {
    id: 'cube',
    name: '정육면체',
    engName: 'Cube',
    category: '정다면체',
    badgeColor: 'bg-indigo-500',
    summary: '6개의 합동인 정사각형 면으로 둘러싸인 대표적 정다면체',
    stats: { faces: 6, edges: 12, vertices: 8 },
    mathPrinciple: '정육면체는 모든 면이 합동인 정사각형이며, 모든 모서리의 길이가 같습니다. 전개도에서 서로 마주보는 세 쌍의 면은 평행하고 합동이어야 하며, 접었을 때 면들이 겹치지 않고 정확히 직각(90°)을 이루어야 합니다.',
    stringMechanism: '계단형(지그재그) 전개도 채택. 최외곽 모서리 구멍에서 중심 면들을 대각선 방향으로 교차 통과하여 하단 손잡이로 모읍니다. 실을 아래로 당기면 바닥면을 기준으로 5개 면이 동시 다발적으로 접혀 올라가며 견고한 큐브가 완성됩니다.',
    specs: {
      base: '정사각형 (5 × 5cm)',
      side: '정사각형 4개 (5 × 5cm)',
      stringPoint: '대각선 방향 모서리 구멍 교차 통과',
      paperSize: '도화지 약 20 × 25cm'
    },
    photos: [
      { step: 1, label: '1단계: 펼쳐진 전개도', src: 'assets/cube_1_flat.jpg', desc: '6개의 동일한 정사각형이 연결된 지그재그형 전개도와 실 꿰기' },
      { step: 2, label: '2단계: 당김 과정', src: 'assets/cube_2_fold.jpg', desc: '대각선 실의 장력으로 각 면들이 90도로 솟아오르는 순간' },
      { step: 3, label: '3단계: 완성된 큐브', src: 'assets/cube_3_solid.jpg', desc: '빈틈없이 맞물려 완벽한 6면체 큐브가 형성된 모습' }
    ],
    curriculum: {
      grade: '초등 5학년 2학기',
      unit: '5. 직육면체',
      goal: '정육면체의 구성 요소(면, 모서리, 꼭짓점)와 성질을 이해하고, 전개도를 접었을 때 마주보는 면과 만나는 모서리를 찾을 수 있다.'
    },
    parentQuestions: {
      step1: '“이 평평한 네모 종이들의 실을 당기면 어떤 상자가 될까? 주사위 모양이 될까?”',
      step2: '“천천히 당겨보자! 1번 면과 6번 면은 접히면서 서로 마주보게 될까, 아니면 옆으로 붙을까?”',
      step3: '“상자가 완성되었네! 서로 마주보고 있는 면들은 몇 쌍일까? 모서리는 총 몇 개가 되었니?”'
    },
    quizzes: [
      {
        id: 'cube_q1',
        question: '정육면체 전개도에서 바닥면(바닥 기준면)과 마주보게 되는 윗면은 어떤 면일까요?',
        options: ['옆면 A', '윗면(마주보는 면)', '옆면 B', '앞면'],
        correctIndex: 1,
        explanation: '정육면체 전개도를 접으면 한 면 건너 위치한 면이 서로 마주보며 평행을 이루게 됩니다.'
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
    summary: '위아래 밑면이 합동인 삼각형이고 옆면이 직사각형인 기둥형 입체',
    stats: { faces: 5, edges: 9, vertices: 6 },
    mathPrinciple: '각기둥은 두 밑면이 서로 평행하고 합동인 다각형이며, 옆면은 모두 직사각형입니다. 삼각기둥은 면이 5개, 모서리가 9개, 꼭짓점이 6개입니다.',
    stringMechanism: '3개의 직사각형 옆면이 가로로 연결되고, 중심 직사각형 상하에 정삼각형 밑면이 결합된 전개도입니다. 실을 당기면 옆면들이 삼각 튜브로 말리고 상하 삼각형이 덮이면서 견고한 삼각 삼각기둥이 됩니다.',
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
      step1: '“삼각형 2개와 네모 3개가 모여 있네. 실을 당기면 지붕 모양 상자가 될까?”',
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
    stringMechanism: '중심 정육각형을 둘러싼 6개의 이등변삼각형 꼭짓점에 구멍을 뚫고, 실을 원형 루프(조임끈) 형태로 꿱니다. 실을 위로 당기면 조임끈이 수축하면서 6개의 꼭짓점이 정확히 한 점(Apex)으로 모여 텐트/피라미드 구조가 완성됩니다.',
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

export const DIY_GUIDE = {
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
      engTitle: 'Drafting & Cutting',
      content: '추천 규격표의 치수에 맞추어 도화지에 자와 연필로 정확한 전개도를 그립니다. 외곽선(실선)을 따라 가위나 칼로 반듯하게 오려냅니다.'
    },
    {
      num: 2,
      title: '칼선 넣기 (가장 중요한 핵심!)',
      engTitle: 'Scoring',
      content: '실을 당겼을 때 종이가 엉뚱한 곳에서 찌그러지지 않도록, 접히는 선(점선)을 따라 칼등이나 다 쓴 볼펜으로 자를 대고 꾹 눌러 자국을 냅니다. 자국을 낸 뒤 미리 손으로 안쪽으로 한 번씩 접었다 펴줍니다.'
    },
    {
      num: 3,
      title: '타공 및 실 꿰기',
      engTitle: 'Punching & Threading',
      content: '구멍 뚫을 자리 뒤쪽에 투명 테이프를 작게 덧댄 후 1공 펀치로 타공하면 여러 번 당겨도 찢어지지 않습니다. 지정된 순서와 경로에 맞추어 실을 꿰어줍니다.'
    },
    {
      num: 4,
      title: 'PULL 손잡이 장착 및 튜닝',
      engTitle: 'Pull Handle & Tuning',
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
