// DIY 준비물 인터랙티브 체크리스트 모듈
import { DIY_GUIDE } from './data.js';

const STORAGE_KEY = 'interactive_geo_checklist_v1';

export function initChecklist() {
  const container = document.getElementById('checklist-container');
  if (!container) return;

  const savedState = loadState();

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

    // Event listeners
    container.querySelectorAll('input[type="checkbox"]').forEach(box => {
      box.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        savedState[id] = e.target.checked;
        saveState(savedState);
        render();
      });
    });

    const resetBtn = container.querySelector('#reset-checklist-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('체크리스트를 모두 초기화하시겠습니까?')) {
          for (let k in savedState) delete savedState[k];
          saveState(savedState);
          render();
        }
      });
    }
  }

  render();
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save checklist state', e);
  }
}
