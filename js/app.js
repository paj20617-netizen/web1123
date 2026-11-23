// 메인 애플리케이션 진입점 및 UI 이벤트 오케스트레이터
import { Scene3DManager } from './scene3d.js';
import { SHAPES_DATA, DIY_GUIDE } from './data.js';
import { renderQuiz } from './quiz.js';
import { initChecklist } from './checklist.js';

class InteractiveApp {
  constructor() {
    this.currentShapeId = 'cube';
    this.foldProgress = 0; // 0 ~ 1
    this.isPlaying = false;
    this.animationSpeed = 0.008; // 자동 재생 속도
    this.sceneManager = null;

    this.init();
  }

  init() {
    // 1. 3D 씬 매니저 초기화
    const container = document.getElementById('scene-container');
    if (container) {
      this.sceneManager = new Scene3DManager(container);
    }

    // 2. 초기 데이터 렌더링
    this.selectShape('cube');
    this.renderDIYGuide();
    initChecklist();

    // 3. 이벤트 바인딩
    this.bindEvents();
  }

  selectShape(shapeId) {
    if (!SHAPES_DATA[shapeId]) return;
    this.currentShapeId = shapeId;

    // A. 헤더 도형 버튼 상태 업데이트
    document.querySelectorAll('.shape-btn').forEach(btn => {
      const isTarget = btn.getAttribute('data-shape') === shapeId;
      if (isTarget) {
        btn.className = 'shape-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 bg-blue-600 text-white border-blue-600 shadow-sm';
      } else {
        btn.className = 'shape-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 bg-white text-slate-700 border-slate-200 hover:bg-slate-100';
      }
    });

    // B. 3D 모델 교체
    if (this.sceneManager) {
      this.sceneManager.loadShape(shapeId);
    }

    // C. 슬라이더 및 진행률 0으로 리셋
    this.setProgress(0);
    if (this.isPlaying) this.togglePlay(false);

    // D. 우측 상세 패널 정보 업데이트
    this.updateShapeInfoPanel(shapeId);

    // E. 퀴즈 모듈 갱신
    renderQuiz(shapeId, (isCorrect, autoFold) => {
      if (isCorrect && autoFold) {
        this.animateFoldTo(1.0);
      }
    });
  }

  updateShapeInfoPanel(shapeId) {
    const data = SHAPES_DATA[shapeId];
    if (!data) return;

    // 뷰포트 상단 표시
    const shapeDisplay = document.getElementById('current-shape-display');
    if (shapeDisplay) shapeDisplay.textContent = `${data.name} (${data.engName})`;

    // 기본 헤더
    const titleEl = document.getElementById('shape-title');
    const engEl = document.getElementById('shape-eng');
    const badgeEl = document.getElementById('shape-category-badge');
    if (titleEl) titleEl.textContent = data.name;
    if (engEl) engEl.textContent = data.engName;
    if (badgeEl) {
      badgeEl.textContent = data.category;
      badgeEl.className = `text-xs px-2.5 py-0.5 rounded-full font-bold text-white ${data.badgeColor}`;
    }

    // 통계 (면, 모서리, 꼭짓점)
    const fEl = document.getElementById('stat-faces');
    const eEl = document.getElementById('stat-edges');
    const vEl = document.getElementById('stat-vertices');
    if (fEl) fEl.textContent = data.stats.faces;
    if (eEl) eEl.textContent = data.stats.edges;
    if (vEl) vEl.textContent = data.stats.vertices;

    // 요약, 원리, 메커니즘
    const sumEl = document.getElementById('shape-summary');
    const mathEl = document.getElementById('shape-math-principle');
    const strEl = document.getElementById('shape-string-mechanism');
    if (sumEl) sumEl.textContent = data.summary;
    if (mathEl) mathEl.textContent = data.mathPrinciple;
    if (strEl) strEl.textContent = data.stringMechanism;

    // 규격 요약
    const specB = document.getElementById('spec-base');
    const specS = document.getElementById('spec-side');
    const specStr = document.getElementById('spec-string');
    if (specB) specB.textContent = data.specs.base;
    if (specS) specS.textContent = data.specs.side;
    if (specStr) specStr.textContent = data.specs.stringPoint;

    // 교과 연계 정보
    const currG = document.getElementById('curr-grade');
    const currU = document.getElementById('curr-unit');
    const currGoal = document.getElementById('curr-goal');
    if (currG) currG.textContent = data.curriculum.grade;
    if (currU) currU.textContent = data.curriculum.unit;
    if (currGoal) currGoal.textContent = data.curriculum.goal;

    // 부모 발문법
    const pq1 = document.getElementById('pq-step1');
    const pq2 = document.getElementById('pq-step2');
    const pq3 = document.getElementById('pq-step3');
    if (pq1) pq1.textContent = data.parentQuestions.step1;
    if (pq2) pq2.textContent = data.parentQuestions.step2;
    if (pq3) pq3.textContent = data.parentQuestions.step3;

    // 실물 제작 사진 갤러리 렌더링
    this.renderPhotoGallery(data.photos);
  }

  renderPhotoGallery(photos) {
    const gallery = document.getElementById('photo-gallery');
    if (!gallery) return;

    if (!photos || photos.length === 0) {
      gallery.innerHTML = '<p class="text-xs text-slate-400 col-span-3">등록된 사진이 없습니다.</p>';
      return;
    }

    gallery.innerHTML = photos.map((p, idx) => `
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
    // 4단계 프로세스 렌더링
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

    // 팁 렌더링
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

    // 3D 모델 업데이트
    if (this.sceneManager) {
      this.sceneManager.setFoldProgress(this.foldProgress);
    }

    // 슬라이더 및 트랙 UI 동기화
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

    // 사진 갤러리 하이라이트 동기화
    this.updatePhotoHighlight();
  }

  animateFoldTo(targetVal) {
    const startVal = this.foldProgress;
    const duration = 1200; // 1.2초
    const startTime = performance.now();

    const stepAnim = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // EaseInOutCubic
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const currentVal = startVal + (targetVal - startVal) * ease;
      this.setProgress(currentVal);

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
    if (next > 1) {
      next = 0; // 100% 도달 시 다시 0%로 반복
    }
    this.setProgress(next);

    requestAnimationFrame(() => this.runPlayLoop());
  }

  bindEvents() {
    // 1. 도형 선택 버튼
    document.querySelectorAll('.shape-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const shape = btn.getAttribute('data-shape');
        this.selectShape(shape);
      });
    });

    // 2. 슬라이더 인터랙션
    const slider = document.getElementById('pull-slider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        if (this.isPlaying) this.togglePlay(false);
        this.setProgress(parseFloat(e.target.value) / 100);
      });
    }

    // 3. 자동 재생 토글 버튼
    const playBtn = document.getElementById('play-pause-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlay());
    }

    // 4. 빠른 스텝 버튼 (0%, 50%, 100%)
    document.querySelectorAll('.quick-step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isPlaying) this.togglePlay(false);
        const target = parseFloat(btn.getAttribute('data-target')) / 100;
        this.animateFoldTo(target);
      });
    });

    // 5. 뷰포트 카메라 프리셋 버튼
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

    // 6. 우측 상세 패널 탭 전환
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabKey = btn.getAttribute('data-tab');

        // 버튼 스타일 전환
        document.querySelectorAll('.tab-btn').forEach(b => {
          b.className = 'tab-btn flex-1 py-2 rounded-xl transition text-center text-slate-600 hover:bg-slate-100';
        });
        btn.className = 'tab-btn flex-1 py-2 rounded-xl transition text-center bg-blue-600 text-white shadow-sm';

        // 패널 전환
        document.querySelectorAll('.tab-panel').forEach(panel => {
          panel.classList.add('hidden');
        });
        const targetPanel = document.getElementById(`tab-content-${tabKey}`);
        if (targetPanel) targetPanel.classList.remove('hidden');
      });
    });
  }
}

// 브라우저 DOM 로드 시 실행
window.addEventListener('DOMContentLoaded', () => {
  window.app = new InteractiveApp();
});
