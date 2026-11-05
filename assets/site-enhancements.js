(() => {
  'use strict';
  const year = document.getElementById('copyright-year');
  if (year) year.textContent = new Date().getFullYear();
  const scene = document.getElementById('cat-scene');
  if (!scene) return;
  const pet = document.getElementById('pet-cat');
  const toggle = document.getElementById('lulu-toggle');
  const status = document.getElementById('cat-status');
  const catImage = document.getElementById('lulu-image');
  const poses = {
    happy: ['images/lulu/playful.png', 'Lulu raising a paw after a pat'],
    sleepy: ['images/lulu/sleeping.png', 'Lulu curled up asleep']
  };
  Object.values(poses).forEach(([src]) => { const image = new Image(); image.src = src; });
  let napTimer;
  let heartTimer;
  const showPose = mood => {
    scene.dataset.mood = mood;
    [catImage.src, catImage.alt] = poses[mood];
  };
  pet.addEventListener('click', () => {
    clearTimeout(napTimer);
    clearTimeout(heartTimer);
    showPose('happy');
    status.textContent = 'Purr… thank you ♡';
    scene.classList.remove('is-petted');
    void scene.offsetWidth;
    scene.classList.add('is-petted');
    heartTimer = setTimeout(() => scene.classList.remove('is-petted'), 900);
    napTimer = setTimeout(() => {
      showPose('sleepy');
      status.textContent = 'Nap time…';
    }, 1200);
  });
  const setExpanded = expanded => {
    scene.hidden = !expanded;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.title = expanded ? 'Minimize Lulu' : 'Show Lulu';
    toggle.innerHTML = `Lulu <span aria-hidden="true">${expanded ? '−' : '+'}</span>`;
  };
  toggle.addEventListener('click', () => setExpanded(scene.hidden));
  document.getElementById('meet-lulu')?.addEventListener('click', event => {
    event.preventDefault();
    setExpanded(true);
    pet.focus({ preventScroll: true });
  });
  pet.disabled = false;
})();
