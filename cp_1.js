const page = document.getElementById('page');
const form = document.getElementById('feedback-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const comments = document.getElementById('comments');
const count = document.getElementById('char-count');
const errors = document.getElementById('errors');
const list = document.getElementById('feedback-display');
const tip = document.getElementById('tooltip');

//live character count
function updateCount() {
    const max = +comments.getAttribute('maxlength');
    count.textContent = comments.value.length + ' / ' + max;
};
updateCount();

//single inout listener for whole form
form.addEventListener('input', (e) => {
  if (e.target === comments) updateCount();
});

//tooltips (mouseover/mouseout)
form.addEventListener('mouseover', (e) => {
  const el = e.target.closest('[data-tip]');
  if (!el) return;
  tip.textContent = el.getAttribute('data-tip');
  const r = el.getBoundingClientRect();
  tip.style.left = (r.left + window.scrollX) + 'px';
  tip.style.top = (r.top +window.scrollY - 28) + 'px';
  tip.hiden = false;
});
form.addEventListener('mouseout', (e) => {
  if (!form.contains(e.relatedTarget)) tip.hidden = true;
});

//stop background clicks from affecting form handlers
form.addEventListener('click', (e) => e.stopPropagation());
page.addEventListener('click', () => (tip.hidden = true));

//validation
function validEmail(v) {
  return v.includes('@') && v.includes('.');
};

function validate() {
  const msgs = [];
  if (!nameInput.value.trim()) msgs.push('Name is required.');
  if (!validEmail(emailInput.value.trim())) msgs.oush('Valid email is required.');
  if (!comments.value.trim()) msgs.push('Comments are required.');
  errors.textContent = msgs.join(' ');
  return msgs.length === 0;
};

//Sub handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate()) return;

//new feedback item
const item = document.createElement('div');
item.className = 'item';
item.textContent = nameInput.value.trim() + ' (' + emailInput.value.trim() + ') ' + comments.value.trim();
list.prepend(item);

// reset form
form.requestFullscreen();
updateCount();
errors.textContent = '';
});