//for member profiles
const members = [
  { name: 'S.Coups', unit: 'hiphop', role: 'Leader, Rapper' },
  { name: 'Jeonghan', unit: 'vocal', role: 'Vocalist' },
  { name: 'Joshua', unit: 'vocal', role: 'Vocalist' },
  { name: 'Jun', unit: 'performance', role: 'Performer' },
  { name: 'Hoshi', unit: 'performance', role: 'Performance Leader' },
  { name: 'Wonwoo', unit: 'hiphop', role: 'Rapper' },
  { name: 'Woozi', unit: 'vocal', role: 'Vocal Leader, Producer' },
  { name: 'DK', unit: 'vocal', role: 'Main Vocalist' },
  { name: 'Mingyu', unit: 'hiphop', role: 'Rapper' },
  { name: 'The8', unit: 'performance', role: 'Performer' },
  { name: 'Seungkwan', unit: 'vocal', role: 'Main Vocalist' },
  { name: 'Vernon', unit: 'hiphop', role: 'Rapper' },
  { name: 'Dino', unit: 'performance', role: 'Maknae, Performer, Main Dancer' }
];

function renderMembers(filter = 'all') {
  const grid = document.getElementById('members-grid');
  grid.innerHTML ='';

  const filtered = filter === 'all'
    ? members
    : members.filter(m => m.unit === filter);

  filtered.forEach(member => {
    const card = document.createElement('article');
    card.className = 'member-card'; 

    card.innerHTML = `
      <div class="member-card__avatar">
        ${member.name.charAt(0)}
      </div>
      <h3>${member.name}</h3>
      <p class="member-unit">${member.unit}</p>
      <p class="member-role">${member.role}</p>
    `;

    grid.appendChild(card);
  });  
}

//for filter buttons
document.querySelectorAll('.filter__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter__btn').forEach(btn => btn.classList.remove('active'));
    btn.classList.add('active');
    renderMembers(btn.dataset.filter);
  });
});

//for contact form
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name-input').value.trim();
  const email = document.getElementById('email-input').value.trim();
  const message = document.getElementById('message-input').value.trim();
  const errorEl = document.getElementById('contact-error');

  if (!name || !email || !message) {
    errorEl.textContent = 'Please fill in all fields!';
    errorEl.hidden = false;
    return;
  }

  errorEl.hidden = true;
  contactForm.reset();
  alert('Message sent! Thank you 🌸');
});

renderMembers();