import { fetchData, getSaved, setSaved, initStarRating } from './api.js';


function renderSaved() {
  const items = getSaved();
  const grid = document.getElementById('tracklist-grid');
  const empty = document.getElementById('saved-empty');

  grid.innerHTML = '';

  if (!items.length) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  items.forEach(item => {
    const card = document.createElement('article');
    // build card content here
    card.className = 'card'

    card.innerHTML = `
      <img src="${item.artworkUrl100.replace('100x100', '300x300')}" 
           alt="${item.trackName} album cover">
      <div class="card__body">
        <h3>${item.trackName}</h3>
        <p>${item.collectionName} · ${item.releaseDate?.slice(0, 4) ?? 'Unknown'}</p>
        <p class="artist-name">${item.artistName}</p>

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

        <textarea class="note-input" placeholder="Add a personal note..."></textarea>

        <button type="button" class="remove-btn">✕ Remove</button>
      </div>
    `;
    initStarRating(card, item, (rating) => {
      // save the rating to localStorage 
      const updated = getSaved().map(s =>
        s.trackId === item.trackId ? { ...s, userRating: rating } : s
      );
      setSaved(updated);
    });
    if (item.userRating) {
      const stars = card.querySelectorAll('.star-rating span');
      stars.forEach((s, i) => {
        s.style.color = i < item.userRating ? '#F7CAC9' : '#ccc';
      });
    }

    const noteInput = card.querySelector('.note-input');
    noteInput.value = item.note || '';
    noteInput.addEventListener('input', () => {
      const updated = getSaved().map(s => 
        s.trackId === item.trackId ? { ...s, note: noteInput.value } : s
      );
      setSaved(updated);
    });

    const removeBtn = card.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
      const updated = getSaved().filter(s => s.trackId !== item.trackId);
      setSaved(updated);
      renderSaved();
    });

    grid.appendChild(card);
  });
}

renderSaved();
