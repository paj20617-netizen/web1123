// 교과 연계 공간지각력 퀴즈 모듈
import { SHAPES_DATA } from './data.js';

export function renderQuiz(shapeId, onCorrectAnswer) {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const shape = SHAPES_DATA[shapeId];
  if (!shape || !shape.quizzes || shape.quizzes.length === 0) {
    container.innerHTML = `<p class="text-sm text-slate-500">해당 도형에 등록된 퀴즈가 없습니다.</p>`;
    return;
  }

  const quiz = shape.quizzes[0]; // 대표 퀴즈 1건 우선 렌더링

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
            <span class="status-icon hidden"></span>
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

      // Reset styles
      buttons.forEach(b => {
        b.disabled = true;
        b.classList.remove('bg-emerald-50', 'border-emerald-300', 'bg-rose-50', 'border-rose-300');
      });

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

        if (typeof onCorrectAnswer === 'function') {
          onCorrectAnswer(true);
        }

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
