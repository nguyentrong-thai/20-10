(() => {
  const audio = document.getElementById('background-music');
  const button = document.getElementById('music-toggle');
  const label = document.getElementById('music-label');
  const status = document.getElementById('music-status');
  let identitySelected = !document.getElementById('identity-gate');
  let wantsPlayback = true;
  let pending = false;
  let needsGesture = true;
  audio.volume = .5;
  function reflectPlayback() {
    const playing = !audio.paused;
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? 'Tắt nhạc Từng Ngày Yêu Em' : 'Bật nhạc Từng Ngày Yêu Em');
    label.textContent = playing ? 'Tắt nhạc' : 'Bật nhạc';
  }
  async function playMusic() {
    if (pending || !identitySelected || !wantsPlayback || document.hidden) return;
    pending = true;
    try {
      await audio.play();
      if (!wantsPlayback || document.hidden) { audio.pause(); return; }
      needsGesture = false;
      reflectPlayback();
      status.textContent = 'Đang phát Từng Ngày Yêu Em — buitruonglinh.';
    } catch (error) {
      if (!wantsPlayback) return;
      reflectPlayback();
      needsGesture = true;
      label.textContent = error.name === 'NotAllowedError' ? 'Chạm để bật nhạc' : 'Thử bật nhạc lại';
      status.textContent = error.name === 'NotAllowedError'
        ? 'Chạm vào trang để bắt đầu bài Từng Ngày Yêu Em.'
        : 'Nhạc chưa tải được. Bạn có thể bấm nút để thử lại.';
    } finally { pending = false; }
  }
  button.addEventListener('click', () => {
    if (!audio.paused || pending) {
      wantsPlayback = false;
      needsGesture = false;
      audio.pause();
      reflectPlayback();
    } else {
      wantsPlayback = true;
      playMusic();
    }
  });
  function firstGesture(event) {
    if (!identitySelected || button.contains(event.target) || !needsGesture || !wantsPlayback) return;
    playMusic();
  }
  const femaleChoice = document.getElementById('female-choice');
  if (femaleChoice) {
    femaleChoice.addEventListener('click', () => {
      identitySelected = true;
      playMusic();
    });
  }
  document.addEventListener('click', firstGesture);
  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') firstGesture(event);
  });
  audio.addEventListener('playing', reflectPlayback);
  audio.addEventListener('pause', reflectPlayback);
  audio.addEventListener('error', () => {
    reflectPlayback();
    label.textContent = 'Thử bật nhạc lại';
    status.textContent = 'Không tải được file nhạc. Bạn thử tải lại trang nhé.';
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) audio.pause();
    else if (wantsPlayback) playMusic();
  });
  window.addEventListener('pagehide', () => audio.pause());
  window.addEventListener('pageshow', event => {
    if (event.persisted && wantsPlayback) playMusic();
  });
  playMusic();
})();
