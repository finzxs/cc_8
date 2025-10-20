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