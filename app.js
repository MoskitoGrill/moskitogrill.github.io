const projects = document.querySelector('#projects');
const buttons = [...document.querySelectorAll('button[data-view]')];
const cards = [...document.querySelectorAll('.project')];
const search = document.querySelector('#search');

function setView(view) {
  if (!['list', 'grid'].includes(view)) return;
  projects.dataset.view = view;
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
  try { localStorage.setItem('hub-view', view); } catch { /* Storage may be disabled. */ }
}

try { setView(localStorage.getItem('hub-view') || 'list'); } catch { setView('list'); }
buttons.forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));

const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('cs');
search.addEventListener('input', () => {
  const query = normalize(search.value.trim());
  let visible = 0;
  cards.forEach(card => {
    card.hidden = !normalize(`${card.dataset.name} ${card.dataset.description}`).includes(query);
    if (!card.hidden) visible++;
  });
  document.querySelector('#count').textContent = visible;
  document.querySelector('#empty').hidden = visible !== 0;
  document.querySelector('#result-status').textContent = `Počet nalezených projektů: ${visible}`;
});
