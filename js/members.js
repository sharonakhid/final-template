//for member profiles
const members = [
  { name: 'S.Coups', unit: 'hiphop', role: 'Leader, Rapper', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/175742510568c02dd1bcc0f.jpg' },
  { name: 'Jeonghan', unit: 'vocal', role: 'Vocalist', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/172710849666f19590d4578.png' },
  { name: 'Joshua', unit: 'vocal', role: 'Vocalist', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/1746763362681d7e62e81bb.jpg' },
  { name: 'Jun', unit: 'performance', role: 'Performer', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/1746763392681d7e8073561.jpg' },
  { name: 'Hoshi', unit: 'performance', role: 'Performance Leader', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/1746763385681d7e7952e69.jpg' },
  { name: 'Wonwoo', unit: 'hiphop', role: 'Rapper', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/1746763338681d7e4a6752e.jpg' },
  { name: 'Woozi', unit: 'vocal', role: 'Vocal Leader, Producer', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/1746763353681d7e59366e7.jpg' },
  { name: 'DK', unit: 'vocal', role: 'Main Vocalist', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/1766553122694b7622529eb.jpg' },
  { name: 'Mingyu', unit: 'hiphop', role: 'Rapper', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/175742514468c02df8ade8f.jpg' },
  { name: 'The8', unit: 'performance', role: 'Performer', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/17812657246a2bf53c988e1.png' },
  { name: 'Seungkwan', unit: 'vocal', role: 'Vocalist', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/1766552699694b747bd2efa.jpg' },
  { name: 'Vernon', unit: 'hiphop', role: 'Rapper', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/17812656956a2bf51fed901.png' },
  { name: 'Dino', unit: 'performance', role: 'Maknae, Performer, Main Dancer', photo: 'https://pledis.co.kr/resources/_data/file/bbsData/17479865076830284b2d24b.jpg' }
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
      <img src="${member.photo}" alt="${member.name}" class="member-card__photo">
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