// Dataset: sample laptops
const LAPTOPS = [
  { id: 101, title: "Apple MacBook Air 13 M1 (2020)", brand: "Apple", price: 799, ramGB: 8, storageGB: 256, storageType: "SSD", cpu: "Apple M1", gpu: "Integrated", condition: "Used - Like New", image: "https://via.placeholder.com/640x480?text=MacBook+Air+M1" },
  { id: 102, title: "Apple MacBook Pro 14 M2 (2023)", brand: "Apple", price: 1699, ramGB: 16, storageGB: 512, storageType: "SSD", cpu: "Apple M2 Pro", gpu: "Integrated", condition: "New", image: "https://via.placeholder.com/640x480?text=MBP+14+M2" },
  { id: 103, title: "Dell XPS 13 9310", brand: "Dell", price: 899, ramGB: 16, storageGB: 512, storageType: "SSD", cpu: "Intel Core i7-1165G7", gpu: "Intel Iris Xe", condition: "Used - Good", image: "https://via.placeholder.com/640x480?text=XPS+13" },
  { id: 104, title: "Dell G15 Gaming", brand: "Dell", price: 1099, ramGB: 16, storageGB: 1000, storageType: "SSD", cpu: "Intel Core i7-12700H", gpu: "NVIDIA RTX 3060", condition: "New", image: "https://via.placeholder.com/640x480?text=Dell+G15" },
  { id: 105, title: "HP Spectre x360 14", brand: "HP", price: 1199, ramGB: 16, storageGB: 512, storageType: "SSD", cpu: "Intel Core i7-1255U", gpu: "Intel Iris Xe", condition: "New", image: "https://via.placeholder.com/640x480?text=Spectre+x360" },
  { id: 106, title: "HP Omen 16", brand: "HP", price: 1299, ramGB: 16, storageGB: 1000, storageType: "SSD", cpu: "AMD Ryzen 7 6800H", gpu: "NVIDIA RTX 3070", condition: "Used - Like New", image: "https://via.placeholder.com/640x480?text=Omen+16" },
  { id: 107, title: "Lenovo ThinkPad X1 Carbon Gen 9", brand: "Lenovo", price: 1099, ramGB: 16, storageGB: 512, storageType: "SSD", cpu: "Intel Core i7-1165G7", gpu: "Intel Iris Xe", condition: "Used - Very Good", image: "https://via.placeholder.com/640x480?text=X1+Carbon" },
  { id: 108, title: "Lenovo Legion 5 Pro", brand: "Lenovo", price: 1399, ramGB: 32, storageGB: 1000, storageType: "SSD", cpu: "AMD Ryzen 7 6800H", gpu: "NVIDIA RTX 3070 Ti", condition: "New", image: "https://via.placeholder.com/640x480?text=Legion+5+Pro" },
  { id: 109, title: "ASUS ROG Zephyrus G14", brand: "ASUS", price: 1499, ramGB: 16, storageGB: 1000, storageType: "SSD", cpu: "AMD Ryzen 9 5900HS", gpu: "NVIDIA RTX 3060", condition: "New", image: "https://via.placeholder.com/640x480?text=G14" },
  { id: 110, title: "ASUS ZenBook 14 OLED", brand: "ASUS", price: 999, ramGB: 16, storageGB: 512, storageType: "SSD", cpu: "Intel Core i7-1260P", gpu: "Intel Iris Xe", condition: "New", image: "https://via.placeholder.com/640x480?text=ZenBook+OLED" },
  { id: 111, title: "Acer Swift 3", brand: "Acer", price: 649, ramGB: 8, storageGB: 512, storageType: "SSD", cpu: "AMD Ryzen 5 5500U", gpu: "Integrated", condition: "Used - Good", image: "https://via.placeholder.com/640x480?text=Swift+3" },
  { id: 112, title: "Acer Predator Helios 300", brand: "Acer", price: 1199, ramGB: 16, storageGB: 1000, storageType: "SSD", cpu: "Intel Core i7-11800H", gpu: "NVIDIA RTX 3060", condition: "Used - Like New", image: "https://via.placeholder.com/640x480?text=Helios+300" },
  { id: 113, title: "MSI GS66 Stealth", brand: "MSI", price: 1599, ramGB: 32, storageGB: 1000, storageType: "SSD", cpu: "Intel Core i7-10870H", gpu: "NVIDIA RTX 3070", condition: "Used - Very Good", image: "https://via.placeholder.com/640x480?text=GS66" },
  { id: 114, title: "MSI Prestige 14", brand: "MSI", price: 999, ramGB: 16, storageGB: 512, storageType: "SSD", cpu: "Intel Core i7-1185G7", gpu: "Intel Iris Xe", condition: "New", image: "https://via.placeholder.com/640x480?text=Prestige+14" },
  { id: 115, title: "Razer Blade 15", brand: "Razer", price: 2299, ramGB: 32, storageGB: 1000, storageType: "SSD", cpu: "Intel Core i7-12800H", gpu: "NVIDIA RTX 3080 Ti", condition: "New", image: "https://via.placeholder.com/640x480?text=Blade+15" },
  { id: 116, title: "Razer Blade 14", brand: "Razer", price: 1999, ramGB: 16, storageGB: 1000, storageType: "SSD", cpu: "AMD Ryzen 9 6900HX", gpu: "NVIDIA RTX 3070 Ti", condition: "Used - Like New", image: "https://via.placeholder.com/640x480?text=Blade+14" },
  { id: 117, title: "Microsoft Surface Laptop 5", brand: "Microsoft", price: 1299, ramGB: 16, storageGB: 512, storageType: "SSD", cpu: "Intel Core i7-1255U", gpu: "Intel Iris Xe", condition: "New", image: "https://via.placeholder.com/640x480?text=Surface+Laptop+5" },
  { id: 118, title: "Microsoft Surface Book 3", brand: "Microsoft", price: 1499, ramGB: 32, storageGB: 1000, storageType: "SSD", cpu: "Intel Core i7-1065G7", gpu: "NVIDIA GTX 1660 Ti", condition: "Used - Good", image: "https://via.placeholder.com/640x480?text=Surface+Book+3" },
  { id: 119, title: "Gigabyte Aero 16", brand: "Gigabyte", price: 1699, ramGB: 16, storageGB: 1000, storageType: "SSD", cpu: "Intel Core i7-12700H", gpu: "NVIDIA RTX 3070 Ti", condition: "New", image: "https://via.placeholder.com/640x480?text=Aero+16" },
  { id: 120, title: "Huawei MateBook X Pro", brand: "Huawei", price: 1299, ramGB: 16, storageGB: 512, storageType: "SSD", cpu: "Intel Core i7-1260P", gpu: "Intel Iris Xe", condition: "New", image: "https://via.placeholder.com/640x480?text=MateBook+X+Pro" },
  { id: 121, title: "Samsung Galaxy Book2 Pro", brand: "Samsung", price: 1199, ramGB: 16, storageGB: 512, storageType: "SSD", cpu: "Intel Core i7-1260P", gpu: "Intel Iris Xe", condition: "New", image: "https://via.placeholder.com/640x480?text=Galaxy+Book2+Pro" },
  { id: 122, title: "Apple MacBook Air 15 M2 (2023)", brand: "Apple", price: 1299, ramGB: 8, storageGB: 256, storageType: "SSD", cpu: "Apple M2", gpu: "Integrated", condition: "New", image: "https://via.placeholder.com/640x480?text=MacBook+Air+15" },
  { id: 123, title: "Lenovo IdeaPad 3", brand: "Lenovo", price: 449, ramGB: 8, storageGB: 256, storageType: "SSD", cpu: "Intel Core i3-1115G4", gpu: "Integrated", condition: "Used - Fair", image: "https://via.placeholder.com/640x480?text=IdeaPad+3" },
  { id: 124, title: "HP Pavilion 15", brand: "HP", price: 599, ramGB: 12, storageGB: 512, storageType: "SSD", cpu: "Intel Core i5-1240P", gpu: "Intel Iris Xe", condition: "Used - Good", image: "https://via.placeholder.com/640x480?text=Pavilion+15" },
  { id: 125, title: "ASUS TUF Gaming F15", brand: "ASUS", price: 899, ramGB: 16, storageGB: 512, storageType: "SSD", cpu: "Intel Core i5-11400H", gpu: "NVIDIA RTX 3050 Ti", condition: "Used - Like New", image: "https://via.placeholder.com/640x480?text=TUF+F15" }
];

// State
const state = {
  searchQuery: "",
  sortBy: "best",
  selectedBrands: new Set(),
  selectedRams: new Set(),
  selectedStorages: new Set(),
  selectedCpus: new Set(),
  selectedGpus: new Set(),
  priceMin: null,
  priceMax: null,
  pageIndex: 1,
  pageSize: 12
};

// DOM refs
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const brandContainer = document.getElementById("filter-brand");
const ramContainer = document.getElementById("filter-ram");
const storageContainer = document.getElementById("filter-storage");
const cpuContainer = document.getElementById("filter-cpu");
const gpuContainer = document.getElementById("filter-gpu");
const priceMinInput = document.getElementById("price-min");
const priceMaxInput = document.getElementById("price-max");
const priceApplyBtn = document.getElementById("price-apply");
const clearFiltersBtn = document.getElementById("clear-filters");
const gridEl = document.getElementById("grid");
const paginationEl = document.getElementById("pagination");
const resultsCountEl = document.getElementById("results-count");

// Utils
function debounce(fn, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

function normalize(text) {
  return String(text || "").toLowerCase();
}

function uniqueSortedNumbers(numbers) {
  return Array.from(new Set(numbers)).sort((a, b) => a - b);
}

// Build filters from dataset
const brands = Array.from(new Set(LAPTOPS.map(l => l.brand))).sort((a, b) => a.localeCompare(b));
const rams = uniqueSortedNumbers(LAPTOPS.map(l => l.ramGB));
const storages = uniqueSortedNumbers(LAPTOPS.map(l => l.storageGB));
const cpus = Array.from(new Set(LAPTOPS.map(l => l.cpu))).sort((a, b) => a.localeCompare(b));
const gpus = Array.from(new Set(LAPTOPS.map(l => l.gpu))).sort((a, b) => a.localeCompare(b));

function createCheckbox(id, value, labelText, onChange) {
  const wrapper = document.createElement("label");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.gap = "8px";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.value = value;
  input.id = id + "-" + value;
  input.addEventListener("change", onChange);

  const text = document.createElement("span");
  text.textContent = labelText;

  wrapper.appendChild(input);
  wrapper.appendChild(text);
  return wrapper;
}

function renderFilterGroup(container, items, stateSet) {
  container.innerHTML = "";
  items.forEach(val => {
    const el = createCheckbox(container.id, String(val), String(val), (e) => {
      if (e.target.checked) {
        stateSet.add(val);
      } else {
        stateSet.delete(val);
      }
      state.pageIndex = 1;
      render();
    });
    container.appendChild(el);
  });
}

function render() {
  const filtered = applyAllFilters(LAPTOPS);
  const sorted = sortItems(filtered);
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / state.pageSize));
  if (state.pageIndex > totalPages) state.pageIndex = totalPages;

  const start = (state.pageIndex - 1) * state.pageSize;
  const pageItems = sorted.slice(start, start + state.pageSize);

  renderResultsCount(totalItems);
  renderGrid(pageItems);
  renderPagination(totalPages);
}

function renderResultsCount(total) {
  resultsCountEl.textContent = total === 0 ? "لا توجد نتائج" : `عدد النتائج: ${total}`;
}

function renderGrid(items) {
  gridEl.innerHTML = "";
  items.forEach(l => {
    const card = document.createElement("article");
    card.className = "card";

    const media = document.createElement("div");
    media.className = "card-media";
    const img = document.createElement("img");
    img.src = l.image;
    img.alt = l.title;
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h3");
    title.className = "title";
    title.textContent = l.title;

    const priceRow = document.createElement("div");
    priceRow.className = "price-row";
    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `$${l.price.toLocaleString()}`;
    const condition = document.createElement("div");
    condition.className = "badge";
    condition.textContent = l.condition;
    priceRow.appendChild(price);
    priceRow.appendChild(condition);

    const specs = document.createElement("div");
    specs.className = "specs";
    [
      `${l.brand}`,
      `${l.ramGB}GB RAM`,
      `${l.storageGB}GB ${l.storageType}`,
      `${l.cpu}`,
      `${l.gpu}`
    ].forEach(text => {
      const b = document.createElement("span");
      b.className = "badge";
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
  paginationEl.innerHTML = "";
  const makeBtn = (label, page, isActive = false, isDisabled = false) => {
    const btn = document.createElement("button");
    btn.className = "page-btn" + (isActive ? " active" : "");
    btn.textContent = label;
    btn.disabled = isDisabled;
    btn.addEventListener("click", () => {
      state.pageIndex = page;
      render();
    });
    return btn;
  };

  const prev = makeBtn("السابق", Math.max(1, state.pageIndex - 1), false, state.pageIndex === 1);
  paginationEl.appendChild(prev);

  const windowSize = 5;
  const start = Math.max(1, state.pageIndex - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  for (let p = start; p <= end; p++) {
    paginationEl.appendChild(makeBtn(String(p), p, p === state.pageIndex));
  }

  const next = makeBtn("التالي", Math.min(totalPages, state.pageIndex + 1), false, state.pageIndex === totalPages);
  paginationEl.appendChild(next);
}

function applyAllFilters(items) {
  const q = normalize(state.searchQuery);
  const tokens = q.split(/\s+/).filter(Boolean);
  return items.filter(l => {
    if (state.selectedBrands.size && !state.selectedBrands.has(l.brand)) return false;
    if (state.selectedRams.size && !state.selectedRams.has(l.ramGB)) return false;
    if (state.selectedStorages.size && !state.selectedStorages.has(l.storageGB)) return false;
    if (state.selectedCpus.size && !state.selectedCpus.has(l.cpu)) return false;
    if (state.selectedGpus.size && !state.selectedGpus.has(l.gpu)) return false;
    if (state.priceMin != null && l.price < state.priceMin) return false;
    if (state.priceMax != null && l.price > state.priceMax) return false;
    if (tokens.length) {
      const hay = normalize(`${l.title} ${l.cpu} ${l.gpu} ${l.brand}`);
      return tokens.every(t => hay.includes(t));
    }
    return true;
  });
}

function scoreRelevance(item, tokens) {
  if (!tokens.length) return 0;
  const hay = normalize(`${item.title} ${item.cpu} ${item.gpu} ${item.brand}`);
  let score = 0;
  tokens.forEach(t => {
    if (hay.includes(t)) score += 1;
    if (item.title.toLowerCase().startsWith(t)) score += 1;
  });
  return score;
}

function sortItems(items) {
  const by = state.sortBy;
  const q = normalize(state.searchQuery);
  const tokens = q.split(/\s+/).filter(Boolean);
  const arr = [...items];
  switch (by) {
    case "price-asc":
      arr.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      arr.sort((a, b) => b.price - a.price);
      break;
    case "ram-desc":
      arr.sort((a, b) => b.ramGB - a.ramGB);
      break;
    case "storage-desc":
      arr.sort((a, b) => b.storageGB - a.storageGB);
      break;
    case "newest":
      arr.sort((a, b) => b.id - a.id);
      break;
    case "best":
    default:
      if (tokens.length) {
        arr.sort((a, b) => scoreRelevance(b, tokens) - scoreRelevance(a, tokens));
      } else {
        arr.sort((a, b) => a.price - b.price);
      }
      break;
  }
  return arr;
}

// Wire up controls
const onSearchInput = debounce((e) => {
  state.searchQuery = e.target.value;
  state.pageIndex = 1;
  render();
}, 300);

searchInput.addEventListener("input", onSearchInput);
sortSelect.addEventListener("change", (e) => {
  state.sortBy = e.target.value;
  state.pageIndex = 1;
  render();
});

priceApplyBtn.addEventListener("click", () => {
  const min = priceMinInput.value === "" ? null : Number(priceMinInput.value);
  const max = priceMaxInput.value === "" ? null : Number(priceMaxInput.value);
  state.priceMin = min;
  state.priceMax = max;
  state.pageIndex = 1;
  render();
});

clearFiltersBtn.addEventListener("click", () => {
  state.selectedBrands.clear();
  state.selectedRams.clear();
  state.selectedStorages.clear();
  state.selectedCpus.clear();
  state.selectedGpus.clear();
  state.priceMin = null;
  state.priceMax = null;
  priceMinInput.value = "";
  priceMaxInput.value = "";
  document.querySelectorAll('.filters input[type="checkbox"]').forEach(cb => { cb.checked = false; });
  state.pageIndex = 1;
  render();
});

// Initial render of filter groups
renderFilterGroup(brandContainer, brands, state.selectedBrands);
renderFilterGroup(ramContainer, rams, state.selectedRams);
renderFilterGroup(storageContainer, storages, state.selectedStorages);
renderFilterGroup(cpuContainer, cpus, state.selectedCpus);
renderFilterGroup(gpuContainer, gpus, state.selectedGpus);

// First render
render();
