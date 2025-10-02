// API-driven frontend for laptops catalog (RTL)

const API_BASE = location.origin;

const state = {
  searchQuery: '',
  sortBy: 'best',
  selectedBrands: new Set(),
  selectedRams: new Set(),
  selectedStorages: new Set(),
  selectedCpus: new Set(),
  selectedGpus: new Set(),
  selectedConditions: new Set(),
  priceMin: null,
  priceMax: null,
  pageIndex: 1,
  pageSize: 12
};

// DOM refs
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const brandContainer = document.getElementById('filter-brand');
const ramContainer = document.getElementById('filter-ram');
const storageContainer = document.getElementById('filter-storage');
const cpuContainer = document.getElementById('filter-cpu');
const gpuContainer = document.getElementById('filter-gpu');
const conditionContainer = document.getElementById('filter-condition');
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');
const priceApplyBtn = document.getElementById('price-apply');
const clearFiltersBtn = document.getElementById('clear-filters');
const gridEl = document.getElementById('grid');
const paginationEl = document.getElementById('pagination');
const resultsCountEl = document.getElementById('results-count');
const pageSizeSelect = document.getElementById('page-size-select');
const activeFiltersEl = document.getElementById('active-filters');

// Utils
function debounce(fn, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

function parseUrlToState() {
  const params = new URLSearchParams(location.search);
  state.searchQuery = params.get('q') || '';
  state.sortBy = params.get('sort') || 'best';
  state.pageIndex = Number(params.get('page') || 1);
  state.pageSize = Number(params.get('pageSize') || 12);
  state.priceMin = params.get('priceMin') ? Number(params.get('priceMin')) : null;
  state.priceMax = params.get('priceMax') ? Number(params.get('priceMax')) : null;

  const setFromParam = (key, targetSet) => {
    targetSet.clear();
    const raw = params.get(key);
    if (!raw) return;
    raw.split(',').filter(Boolean).forEach(v => {
      const num = Number(v);
      targetSet.add(Number.isFinite(num) ? num : v);
    });
  };

  setFromParam('brand', state.selectedBrands);
  setFromParam('ram', state.selectedRams);
  setFromParam('storage', state.selectedStorages);
  setFromParam('cpu', state.selectedCpus);
  setFromParam('gpu', state.selectedGpus);
  setFromParam('condition', state.selectedConditions);
}

function syncStateToUrl(replace = false) {
  const params = new URLSearchParams();
  if (state.searchQuery) params.set('q', state.searchQuery);
  if (state.selectedBrands.size) params.set('brand', Array.from(state.selectedBrands).join(','));
  if (state.selectedRams.size) params.set('ram', Array.from(state.selectedRams).join(','));
  if (state.selectedStorages.size) params.set('storage', Array.from(state.selectedStorages).join(','));
  if (state.selectedCpus.size) params.set('cpu', Array.from(state.selectedCpus).join(','));
  if (state.selectedGpus.size) params.set('gpu', Array.from(state.selectedGpus).join(','));
  if (state.selectedConditions.size) params.set('condition', Array.from(state.selectedConditions).join(','));
  if (state.priceMin != null) params.set('priceMin', String(state.priceMin));
  if (state.priceMax != null) params.set('priceMax', String(state.priceMax));
  params.set('sort', state.sortBy);
  params.set('page', String(state.pageIndex));
  params.set('pageSize', String(state.pageSize));

  const newUrl = `${location.pathname}?${params.toString()}`;
  if (replace) history.replaceState(null, '', newUrl);
  else history.pushState(null, '', newUrl);
}

function createCheckbox(id, value, labelText, onChange) {
  const wrapper = document.createElement('label');
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.gap = '8px';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.value = value;
  input.id = id + '-' + value;
  input.addEventListener('change', onChange);

  const text = document.createElement('span');
  text.textContent = labelText;

  wrapper.appendChild(input);
  wrapper.appendChild(text);
  return wrapper;
}

function renderFilterGroup(container, items, stateSet) {
  container.innerHTML = '';
  items.forEach(val => {
    const el = createCheckbox(container.id, String(val), String(val), (e) => {
      if (e.target.checked) {
        stateSet.add(val);
      } else {
        stateSet.delete(val);
      }
      state.pageIndex = 1;
      syncStateToUrl();
      render();
    });
    container.appendChild(el);
  });
}

function renderActiveFilters() {
  const chips = [];
  const addChip = (label, value) => chips.push(`${label}: ${value}`);
  state.selectedBrands.forEach(v => addChip('علامة', v));
  state.selectedRams.forEach(v => addChip('رام', v));
  state.selectedStorages.forEach(v => addChip('تخزين', v));
  state.selectedCpus.forEach(v => addChip('CPU', v));
  state.selectedGpus.forEach(v => addChip('GPU', v));
  state.selectedConditions.forEach(v => addChip('حالة', v));
  if (state.priceMin != null || state.priceMax != null) {
    addChip('السعر', `${state.priceMin ?? '—'} - ${state.priceMax ?? '—'}`);
  }

  activeFiltersEl.innerHTML = '';
  chips.forEach(text => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = text;
    activeFiltersEl.appendChild(span);
  });
}

async function render() {
  const params = new URLSearchParams();
  if (state.searchQuery) params.set('q', state.searchQuery);
  if (state.selectedBrands.size) params.set('brand', Array.from(state.selectedBrands).join(','));
  if (state.selectedRams.size) params.set('ram', Array.from(state.selectedRams).join(','));
  if (state.selectedStorages.size) params.set('storage', Array.from(state.selectedStorages).join(','));
  if (state.selectedCpus.size) params.set('cpu', Array.from(state.selectedCpus).join(','));
  if (state.selectedGpus.size) params.set('gpu', Array.from(state.selectedGpus).join(','));
  if (state.selectedConditions.size) params.set('condition', Array.from(state.selectedConditions).join(','));
  if (state.priceMin != null) params.set('priceMin', String(state.priceMin));
  if (state.priceMax != null) params.set('priceMax', String(state.priceMax));
  params.set('sort', state.sortBy);
  params.set('page', String(state.pageIndex));
  params.set('pageSize', String(state.pageSize));

  const res = await fetch(`${API_BASE}/api/laptops?${params.toString()}`);
  const { total, items } = await res.json();
  const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
  if (state.pageIndex > totalPages) state.pageIndex = totalPages;

  renderResultsCount(total);
  renderGrid(items);
  renderPagination(totalPages);
  renderActiveFilters();
}

function renderResultsCount(total) {
  resultsCountEl.textContent = total === 0 ? 'لا توجد نتائج' : `عدد النتائج: ${total}`;
}

function renderGrid(items) {
  gridEl.innerHTML = '';
  items.forEach(l => {
    const card = document.createElement('article');
    card.className = 'card';

    const media = document.createElement('div');
    media.className = 'card-media';
    const img = document.createElement('img');
    img.src = l.image;
    img.alt = l.title;
    media.appendChild(img);

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h3');
    title.className = 'title';
    title.textContent = l.title;

    const priceRow = document.createElement('div');
    priceRow.className = 'price-row';
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = `$${l.price.toLocaleString()}`;
    const condition = document.createElement('div');
    condition.className = 'badge';
    condition.textContent = l.condition;
    priceRow.appendChild(price);
    priceRow.appendChild(condition);

    const specs = document.createElement('div');
    specs.className = 'specs';
    [
      `${l.brand}`,
      `${l.ramGB}GB RAM`,
      `${l.storageGB}GB ${l.storageType}`,
      `${l.cpu}`,
      `${l.gpu}`
    ].forEach(text => {
      const b = document.createElement('span');
      b.className = 'badge';
      b.textContent = text;
      specs.appendChild(b);
    });

    body.appendChild(title);
    body.appendChild(priceRow);
    body.appendChild(specs);

    card.appendChild(media);
    card.appendChild(body);
    gridEl.appendChild(card);
  });
}

function renderPagination(totalPages) {
  paginationEl.innerHTML = '';
  const makeBtn = (label, page, isActive = false, isDisabled = false) => {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (isActive ? ' active' : '');
    btn.textContent = label;
    btn.disabled = isDisabled;
    btn.addEventListener('click', () => {
      state.pageIndex = page;
      syncStateToUrl();
      render();
    });
    return btn;
  };

  const prev = makeBtn('السابق', Math.max(1, state.pageIndex - 1), false, state.pageIndex === 1);
  paginationEl.appendChild(prev);

  const windowSize = 5;
  const start = Math.max(1, state.pageIndex - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  for (let p = start; p <= end; p++) {
    paginationEl.appendChild(makeBtn(String(p), p, p === state.pageIndex));
  }

  const next = makeBtn('التالي', Math.min(totalPages, state.pageIndex + 1), false, state.pageIndex === totalPages);
  paginationEl.appendChild(next);
}

// Wire up controls
const onSearchInput = debounce((e) => {
  state.searchQuery = e.target.value;
  state.pageIndex = 1;
  syncStateToUrl();
  render();
}, 300);

searchInput.value = state.searchQuery;
searchInput.addEventListener('input', onSearchInput);

sortSelect.value = state.sortBy;
sortSelect.addEventListener('change', (e) => {
  state.sortBy = e.target.value;
  state.pageIndex = 1;
  syncStateToUrl();
  render();
});

pageSizeSelect.value = String(state.pageSize);
pageSizeSelect.addEventListener('change', (e) => {
  state.pageSize = Number(e.target.value);
  state.pageIndex = 1;
  syncStateToUrl();
  render();
});

priceApplyBtn.addEventListener('click', () => {
  const min = priceMinInput.value === '' ? null : Number(priceMinInput.value);
  const max = priceMaxInput.value === '' ? null : Number(priceMaxInput.value);
  state.priceMin = min;
  state.priceMax = max;
  state.pageIndex = 1;
  syncStateToUrl();
  render();
});

clearFiltersBtn.addEventListener('click', () => {
  state.selectedBrands.clear();
  state.selectedRams.clear();
  state.selectedStorages.clear();
  state.selectedCpus.clear();
  state.selectedGpus.clear();
  state.selectedConditions.clear();
  state.priceMin = null;
  state.priceMax = null;
  priceMinInput.value = '';
  priceMaxInput.value = '';
  document.querySelectorAll('.filters input[type="checkbox"]').forEach(cb => { cb.checked = false; });
  state.pageIndex = 1;
  syncStateToUrl();
  render();
});

async function init() {
  parseUrlToState();
  // update UI from URL-derived state
  searchInput.value = state.searchQuery;
  sortSelect.value = state.sortBy;
  pageSizeSelect.value = String(state.pageSize);
  priceMinInput.value = state.priceMin ?? '';
  priceMaxInput.value = state.priceMax ?? '';

  const res = await fetch(`${API_BASE}/api/filters`);
  const data = await res.json();
  const brands = data.brands || [];
  const rams = data.rams || [];
  const storages = data.storages || [];
  const cpus = data.cpus || [];
  const gpus = data.gpus || [];
  const conditions = data.conditions || [];

  renderFilterGroup(brandContainer, brands, state.selectedBrands);
  renderFilterGroup(ramContainer, rams, state.selectedRams);
  renderFilterGroup(storageContainer, storages, state.selectedStorages);
  renderFilterGroup(cpuContainer, cpus, state.selectedCpus);
  renderFilterGroup(gpuContainer, gpus, state.selectedGpus);
  renderFilterGroup(conditionContainer, conditions, state.selectedConditions);

  // Check checkboxes based on state
  const checkSet = (containerId, set) => {
    set.forEach(v => {
      const el = document.getElementById(containerId + '-' + v);
      if (el) el.checked = true;
    });
  };
  checkSet('filter-brand', state.selectedBrands);
  checkSet('filter-ram', state.selectedRams);
  checkSet('filter-storage', state.selectedStorages);
  checkSet('filter-cpu', state.selectedCpus);
  checkSet('filter-gpu', state.selectedGpus);
  checkSet('filter-condition', state.selectedConditions);

  syncStateToUrl(true);
  render();
}

window.addEventListener('popstate', () => {
  parseUrlToState();
  render();
});

init();