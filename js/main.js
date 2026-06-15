import { fetchData, getSaved, setSaved, initStarRating } from './api.js';

// --- State ---
// keep your application state as an array of objects
let savedItems = getSaved();

// DOM references 
const searchForm = document.getElementById('search-form');
const resultsGrid = document.getElementById('results-grid');
const loadingMsg = document.getElementById('loading-msg');
const errorMsg = document.getElementById('error-msg');
const searchInput = document.getElementById('searchbar');
const sortSelect = document.getElementById('sort-select');

const debouncedSearch = debounce((query) => {
  if (query.length >= 1) {
    searchForm.dispatchEvent(new Event('submit'));
  }
}, 500);

searchInput.addEventListener('input', () => {
  debouncedSearch(searchInput.value.trim());
});

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

let currentResults = [];

const seventeen_artists = [
  'seventeen',
  'bss',
  'dxs',
  'jxw',
  'hxw',
  'cxm',
  'seventeen vocal unit',
  'seventeen hiphop unit',
  'seventeen performance unit'
];

function sortResults(items) {
  const sortValue = sortSelect.value;

  if (sortValue === 'az') {
    return [...items].sort((a, b) => 
      a.trackName.localeCompare(b.trackName)
    );
  } else if (sortValue === 'za') {
    return [...items].sort((a, b) => 
      b.trackName.localeCompare(a.trackName)
    );
  } else if (sortValue === 'newest') {
    return [...items].sort((a, b) => 
      new Date(b.releaseDate) - new Date(a.releaseDate)
    );
  }

  return items;
}

function handleSave(button, item) {
  const alreadySaved = savedItems.some(s => s.trackId === item.trackId);
  
  if (alreadySaved) {
    savedItems = savedItems.filter(s => s.trackId !== item.trackId);
    button.textContent = '+ Save';
    button.style.backgroundColor = 'var(--color-rosequartz)';
    button.style.color = '#1a1a1a';
  } else {
    savedItems.push(item);
    button.textContent = '✓ Saved';
    button.style.backgroundColor = 'var(--color-serenity)';
    button.style.color = 'white';
  }
  
  setSaved(savedItems);
}

function isSVTSong(item) {
  const artist = item.artistName.toLowerCase();
  return seventeen_artists.some(name => artist.includes(name));
}

function showLoading(visible) {
  loadingMsg.hidden = !visible;
  errorMsg.hidden = true;
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.hidden = false;
  loadingMsg.hidden = true;
}

function renderResults(items) {
  // create a card element for each item
  resultsGrid.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';

    card.innerHTML = `
  <img src="${item.artworkUrl100.replace('100x100', '300x300')}" 
     alt="${item.trackName} album cover">
  <div class="card__body">
    <h3>${item.trackName}</h3>
    <p>${item.collectionName} · ${item.releaseDate?.slice(0, 4) ?? 'Unknown'}</p>
    
    ${item.previewUrl ? `
      <audio controls src="${item.previewUrl}"></audio>
    ` : '<p class="no-preview">No preview available</p>'}

    <div class="star-rating" data-id="${item.trackId}">
      <span data-value="1">★</span>
      <span data-value="2">★</span>
      <span data-value="3">★</span>
      <span data-value="4">★</span>
      <span data-value="5">★</span>
    </div>

    <button type="button" class="save-btn">+ Save</button>
  </div>
`;  

    initStarRating(card, item);

    const saveBtn = card.querySelector('.save-btn');
    saveBtn.addEventListener('click', () => handleSave(saveBtn, item));
    
    const alreadySaved = savedItems.some(s => s.trackId === item.trackId);
    if (alreadySaved) {
      saveBtn.textContent = '✓ Saved';
      saveBtn.style.backgroundColor = 'var(--color-serenity)';
      saveBtn.style.color ='white';
    }

    const savedItem = savedItems.find(s => s.trackId === item.trackId);
    if (savedItem?.userRating) {
      const stars = card.querySelectorAll('.star-rating span');
      stars.forEach((s, i) => {
        s.style.color = i < savedItem.userRating ? '#F7CAC9' : '#ccc';
      });
    }
    
    document.getElementById('results-grid').appendChild(card);
  });
}

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    showError('Please enter a search term!');
    return;
  }

  showLoading(true);
  resultsGrid.innerHTML = '';

  try {
    const data = await fetchData(
      `/search?term=seventeen+${encodeURIComponent(query)}&entity=song&limit=20`
    );
    showLoading(false);

    const svtResults = data.results.filter(isSVTSong);

    if (svtResults.length === 0) {
      showError('No SEVENTEEN songs found! Try a different search.');
      return;
    }

    currentResults = svtResults; // save results
    const sorted = sortResults(svtResults);
    renderResults(sorted);

  } catch (error) {
    showLoading(false);
    showError('Something went wrong. Check your internet conection!')
  }
});

document.querySelectorAll('.filter__pill').forEach(pill => {
  pill.addEventListener('change', () => {
    const selectedUnit = document.querySelector('.filter__pill input:checked').value.toLowerCase();
    
    const filtered = selectedUnit === 'all'
      ? currentResults
      : currentResults.filter(item => {
          const artist = item.artistName.toLowerCase();
          return artist.includes(selectedUnit);
        });
    const sorted = sortResults(filtered);
    renderResults(sorted);
  });
});
