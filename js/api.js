const BASE_URL = 'https://itunes.apple.com'; // replace with your API base URL

export async function fetchData(endpoint) {
  const response = await fetch(BASE_URL + endpoint);
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
  // fetch, check response.ok, return response.json()
}

// localStorage helpers — import these wherever you need saved state
export function getSaved() {
  const raw = localStorage.getItem('savedItems');
  return raw ? JSON.parse(raw) : [];
}

export function setSaved(items) {
  localStorage.setItem('savedItems', JSON.stringify(items));
}

export function initStarRating(card, item, onRate) {
  const stars = card.querySelectorAll('.star-rating span');
  
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.value);
      stars.forEach((s, i) => {
        s.style.color = i < rating ? '#F7CAC9' : '#ccc';
      });
      item.userRating = rating;
      if (onRate) onRate(rating);
    });

    star.addEventListener('mouseover', () => {
      const rating = parseInt(star.dataset.value);
      stars.forEach((s, i) => {
        s.style.color = i < rating ? '#F7CAC9' : '#ccc';
      });
    });

    star.addEventListener('mouseout', () => {
      const rating = item.userRating || 0;
      stars.forEach((s, i) => {
        s.style.color = i < rating ? '#F7CAC9' : '#ccc';
      });
    });
  });
}
