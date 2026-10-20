const intro = document.getElementById('intro');
const letter = document.getElementById('letter');
const openButton = document.getElementById('open');
const petals = document.getElementById('petals');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
// Some browsers restore disabled controls and scroll positions on reload.
openButton.disabled = false;
if (window.history && 'scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
window.addEventListener('pageshow', event => {
  if (!event.persisted) window.scrollTo({top:0, behavior:'instant'});
});
let growTimer;
let burstTimer;
let opened = false;
let revealTimer;
const field = document.getElementById('flower-field');
const gardenActions = document.getElementById('garden-actions');
const identityGate = document.getElementById('identity-gate');
const identityChoice = document.getElementById('identity-choice');
const identityWarning = document.getElementById('identity-warning');
const identityRefusal = document.getElementById('identity-refusal');
const warningMark = document.getElementById('warning-mark');
const warningTitle = document.getElementById('warning-title');
const warningCopy = document.getElementById('warning-copy');
let maleAttempts = 0;
function resetWarning() {
  maleAttempts = 0;
  warningMark.textContent = '✕';
  warningTitle.textContent = 'CẢNH BÁO';
  warningCopy.textContent = 'Đàn ông không được tiếp tục. Hãy quay lại.';
  identityGate.classList.remove('warning-level-5', 'warning-level-7', 'warning-level-9');
}
function resetIdentityChoice() {
  resetWarning();
  warningMark.style.transform = 'scale(.25)';
  warningMark.style.opacity = '.15';
  identityWarning.hidden = true;
  identityRefusal.hidden = true;
  identityChoice.hidden = false;
  identityGate.classList.remove('warning-state', 'refusal-state');
  document.getElementById('male-choice').focus();
}
document.getElementById('female-choice').addEventListener('click', () => {
  identityGate.hidden = true;
  document.getElementById('site-content').inert = false;
  document.getElementById('open').focus();
});
document.getElementById('male-choice').addEventListener('click', () => {
  resetWarning();
  warningMark.style.transform = 'scale(.25)';
  warningMark.style.opacity = '.15';
  identityChoice.hidden = true;
  identityWarning.hidden = false;
  identityGate.classList.add('warning-state');
  document.getElementById('insist-male').focus();
});
document.getElementById('insist-male').addEventListener('click', () => {
  if (maleAttempts >= 10) return;
  maleAttempts++;
  warningMark.style.transform = `scale(${.25 + maleAttempts * .075})`;
  warningMark.style.opacity = String(.15 + maleAttempts * .085);
  if (maleAttempts === 5) {
    identityGate.classList.add('warning-level-5');
    warningTitle.textContent = 'CẢNH BÁO NGHIÊM TRỌNG';
    warningCopy.textContent = 'Bạn đã được cảnh báo nhiều lần. Dừng lại và quay về.';
  } else if (maleAttempts === 7) {
    identityGate.classList.add('warning-level-7');
    warningMark.textContent = '⚠';
    warningTitle.textContent = 'NGUY HIỂM';
    warningCopy.textContent = 'Không tiếp tục bấm. Hãy chọn “Quay lại” ngay.';
  } else if (maleAttempts === 9) {
    identityGate.classList.add('warning-level-9');
    warningMark.textContent = '⚠';
    warningTitle.textContent = 'CẢNH BÁO CUỐI CÙNG';
    warningCopy.textContent = 'Nếu tiếp tục, bạn tự chịu trách nhiệm. Đây là cảnh báo cuối cùng.';
  }
  if (maleAttempts === 10) {
    identityWarning.hidden = true;
    identityRefusal.hidden = false;
    identityGate.classList.remove('warning-state');
    identityGate.classList.add('refusal-state');
    document.getElementById('back-from-refusal').focus();
  }
});
document.getElementById('back-to-identity').addEventListener('click', resetIdentityChoice);
document.getElementById('back-from-refusal').addEventListener('click', resetIdentityChoice);
const flowerTypes = [
  {src:'assets/pink-flower.webp', name:'Cúc hồng'},
  {src:'assets/white-daisy.webp', name:'Cúc trắng'},
  {src:'assets/peach-rose.webp', name:'Hồng đào'},
  {src:'assets/sunflower.webp', name:'Hướng dương'},
  {src:'assets/lilac-aster.webp', name:'Thạch thảo tím'}
];
const flowerSources = flowerTypes.map(flower => flower.src);
const flowerTextures = flowerSources.map(src => {
  const image = new Image();
  image.src = src;
  return image;
});
const textureReady = Promise.all(flowerTextures.map(image => image.decode().catch(() => {})));
const flowerCount = window.matchMedia('(max-width: 700px)').matches ? 20 : 32;
const fieldFragment = document.createDocumentFragment();
for (let i = 0; i < flowerCount; i++) {
  const stem = document.createElement('div');
  stem.className = 'field-flower';
  const row = i % 2;
  const column = Math.floor(i / 2);
  const flower = flowerTypes[i % flowerTypes.length];
  stem.style.setProperty('--x', `${column / (flowerCount / 2 - 1) * 96 + row * 3}%`);
  stem.style.setProperty('--height', `${row ? 29 + (i * 7 % 12) : 47 + (i * 7 % 12)}svh`);
  stem.style.zIndex = String(row ? 2 : 1);
  stem.style.setProperty('--sway-time', `${6 + i % 5}s`);
  stem.style.setProperty('--sway-delay', `${-i * .73}s`);
  stem.style.setProperty('--wait', `${(i % 6) * 70}ms`);
  stem.style.setProperty('--tilt', `${(i % 7 - 3) * 4}deg`);
  stem.innerHTML = `<div class="flower-sway"><img src="${flower.src}" width="512" height="768" alt="" decoding="async"><button type="button" class="flower-hit" aria-label="${flower.name}, bông ${i + 1}: mở một lời chúc" title="${flower.name} · Chạm để nhận lời chúc"></button></div>`;
  stem.querySelector('button').addEventListener('click', () => openFlowerWish(flower));
  fieldFragment.appendChild(stem);
}
field.appendChild(fieldFragment);
function makePetal(extra = false) {
  const petal = document.createElement('i');
  petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty('--duration', `${extra ? 4 + Math.random() * 3 : 12 + Math.random() * 10}s`);
  petal.style.setProperty('--delay', `${extra ? Math.random() : -Math.random() * 22}s`);
  petal.style.width = `${8 + Math.random() * 10}px`;
  if (extra) petal.dataset.extra = 'true';
  petals.appendChild(petal);
}
for (let i = 0; i < 10; i++) makePetal();
function startInvitation() {
  clearInterval(growTimer);
  let steps = 0;
  openButton.style.setProperty('--grow', '1');
  openButton.classList.remove('waiting');
  growTimer = setInterval(() => {
    if (document.hidden || opened) return;
    steps++;
    openButton.style.setProperty('--grow', String(Math.min(1.24, 1 + steps * .04)));
    openButton.classList.add('waiting');
    if (steps >= 6) clearInterval(growTimer);
  }, 3500);
}
function shower() {
  if (reducedMotion.matches) return;
  clearTimeout(burstTimer);
  petals.querySelectorAll('[data-extra]').forEach(p => p.remove());
  for (let i = 0; i < 10; i++) makePetal(true);
  burstTimer = setTimeout(() => petals.querySelectorAll('[data-extra]').forEach(p => p.remove()), 8500);
}
openButton.addEventListener('click', async () => {
  if (opened) return;
  opened = true;
  clearInterval(growTimer);
  openButton.classList.remove('waiting');
  openButton.disabled = true;
  await textureReady;
  document.body.classList.add('blooming');
  document.getElementById('hint').textContent = 'Một đóa hoa chưa đủ… gửi bạn cả một vườn thương.';
  shower();
  revealTimer = setTimeout(() => {
    intro.hidden = true;
    letter.hidden = false;
    document.body.classList.add('reading');
    document.getElementById('letter-title').focus({preventScroll:true});
  }, reducedMotion.matches ? 0 : 2300);
});
const wishDialog = document.getElementById('wish-dialog');
function updateWishCounter() {
  const remaining = window.gardenWishes.remaining();
  document.getElementById('wish-counter').textContent = remaining
    ? `${remaining} lời chúc chưa được khám phá`
    : 'Bạn đã nhận trọn 60 lời chúc trong khu vườn này ♡';
}
function openFlowerWish(flower) {
  const wish = window.gardenWishes.next();
  document.getElementById('wish-flower').src = flower.src;
  document.getElementById('wish-species').textContent = flower.name;
  document.getElementById('wish-text').textContent = wish?.text ||
    'Bạn đã khám phá hết những lời chúc của khu vườn. Mời bạn ở lại ngắm hoa và tận hưởng bản nhạc nhé.';
  document.getElementById('wish-title').textContent = wish?.title || 'Một vườn yêu thương.';
  updateWishCounter();
  document.body.classList.add('wish-open');
  wishDialog.showModal();
}
document.getElementById('close-wish').addEventListener('click', () => wishDialog.close());
document.getElementById('continue-garden').addEventListener('click', () => wishDialog.close());
wishDialog.addEventListener('click', event => {
  const rect = wishDialog.getBoundingClientRect();
  if (event.target === wishDialog && (event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom)) wishDialog.close();
});
wishDialog.addEventListener('close', () => document.body.classList.remove('wish-open'));
document.getElementById('again').addEventListener('click', () => {
  shower();
  const wish = window.gardenWishes.next();
  document.getElementById('status').textContent = wish?.text || 'Bạn đã nhận trọn những lời chúc của khu vườn ♡';
  updateWishCounter();
});
document.getElementById('back').addEventListener('click', () => {
  clearTimeout(revealTimer);
  opened = false;
  openButton.disabled = false;
  document.body.classList.remove('blooming', 'reading', 'garden-view');
  field.inert = true;
  gardenActions.hidden = true;
  letter.hidden = true;
  intro.hidden = false;
  document.getElementById('hint').textContent = 'Chạm nhẹ thôi, có điều dễ thương đang chờ bạn.';
  document.getElementById('status').textContent = '';
  startInvitation();
  openButton.focus({preventScroll:true});
  window.scrollTo({top:0, behavior:'instant'});
});
document.getElementById('view-garden').addEventListener('click', () => {
  letter.hidden = true;
  gardenActions.hidden = false;
  document.body.classList.remove('reading');
  document.body.classList.add('garden-view');
  field.inert = false;
  updateWishCounter();
  gardenActions.focus({preventScroll:true});
  window.scrollTo({top:0, behavior:reducedMotion.matches ? 'instant' : 'smooth'});
});
document.getElementById('read-again').addEventListener('click', () => {
  gardenActions.hidden = true;
  letter.hidden = false;
  document.body.classList.add('reading');
  document.body.classList.remove('garden-view');
  field.inert = true;
  document.getElementById('letter-title').focus({preventScroll:true});
});
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('motion-paused', document.hidden);
});
startInvitation();
