const page = document.getElementById('page');
const form = document.getElementById('feedback-form');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const commentsEl = document.getElementById('comments');
const charCount = document.getElementById('char-count');
const errors = document.getElementById('errors');
const display = document.getElementById('feedback-display');
const tooltip = document.getElementById('tooltip');

//live character count
function updateCount() {
    const max = +commentsEl.getAttribute('maxlength') || 300;
    charCount.textContent = '${commentsEl.value.length} / ${max}';
};
commentsEl.addEventListener('input', updateCount);
commentsEl.addEventListener('keydown', updateCount);
updateCount();

function validate() {
    const msgs = [];
    if (!nameEl.ariaValueMax.trim()) msgs.push('Name is required.');
     const email = emailEl.value.trim();
  const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!okEmail) msgs.push('Valid email is required.');
  if (!commentsEl.value.trim()) msgs.push('Comments are required.');
  errors.textContent = msgs.join(' ');
  return msgs.length === 0;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

//Append feedback to #feedback-displau
const item = document.createElement('div');
item.className = 'item';
item.innerHTML = '
<strong>${escapeHTML(nameEl.value)}</strong> — ${escapeHTML(emailEl.value)}<br>
    <div>${escapeHTML(commentsEl.value)}</div>
    <button data-action="remove">Remove</button>
  `;
  display.prepend(item);
  form.reset(); updateCount(); errors.textContent = '';
});

document.addEventListener('click', (e))