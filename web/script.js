// =====================================================
// KONFIGURASI PESAN — ganti teks di bawah sesuai keinginanmu
// =====================================================
const LOVE_LETTER = `Selamat ulang tahun ke-22, Nadia sayang.

Di antara semua hari dalam setahun, hari ini adalah favoritku, karena hari ini dunia jadi lebih baik sejak kamu lahir.

Terima kasih sudah menjadi alasan aku tersenyum di hari-hari yang berat, jadi tempat aku pulang saat semua terasa membingungkan, dan jadi orang yang selalu bikin aku ingin jadi versi terbaik dari diriku.

Semoga di usia 22 ini, semua mimpimu pelan-pelan jadi nyata, kesehatanmu selalu dijaga, dan cinta di sekitarmu terus bertambah — termasuk dariku, hari ini, besok, dan seterusnya.

Happy birthday, cantik. Aku sayang kamu lebih dari yang bisa kata-kata ini sampaikan.`;

const TYPED_GREETING = "Selamat ulang tahun, Nadia. Semoga usia 22 membawa lebih banyak tawa, lebih sedikit air mata, dan cinta yang terus tumbuh setiap harinya. 💗";

// =====================================================
// FLOATING HEARTS BACKGROUND
// =====================================================
(function floatingHearts(){
  const field = document.getElementById('hearts-field');
  if(!field) return;
  const symbols = ['💗','💕','💖','🩷','❤'];

  function spawnHeart(){
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const size = 14 + Math.random() * 22;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = size + 'px';
    const duration = 8 + Math.random() * 8;
    heart.style.animationDuration = duration + 's';
    field.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 500);
  }

  for(let i = 0; i < 10; i++){
    setTimeout(spawnHeart, i * 400);
  }
  setInterval(spawnHeart, 1300);
})();

// =====================================================
// ENVELOPE / LOVE LETTER MODAL
// =====================================================
(function letterModal(){
  const openBtn = document.getElementById('open-envelope');
  const closeBtn = document.getElementById('close-letter');
  const modal = document.getElementById('letter-modal');
  const letterText = document.getElementById('letter-text');
  if(!openBtn || !modal) return;

  letterText.textContent = LOVE_LETTER;

  function open(){
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if(e.target === modal) close();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') close();
  });
})();

// =====================================================
// CAKE: BLOW CANDLES + CONFETTI
// =====================================================
(function cakeWish(){
  const blowBtn = document.getElementById('blow-btn');
  const candles = document.getElementById('candles');
  const wishMade = document.getElementById('wish-made');
  if(!blowBtn) return;

  blowBtn.addEventListener('click', () => {
    if(candles.classList.contains('blown')) return;
    candles.classList.add('blown');
    blowBtn.disabled = true;
    blowBtn.textContent = 'Lilinnya sudah padam 🎉';
    wishMade.classList.add('show');
    launchConfetti();
  });
})();

function launchConfetti(){
  const layer = document.getElementById('confetti-layer');
  if(!layer) return;
  const colors = ['#e8517a', '#f4c95d', '#ffffff', '#c2185b', '#f2a6c4'];
  const shapes = ['heart', 'square'];

  for(let i = 0; i < 60; i++){
    setTimeout(() => {
      const piece = document.createElement('span');
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = 2.6 + Math.random() * 2.2;
      const size = 8 + Math.random() * 10;

      piece.className = 'confetti-piece';
      piece.style.left = left + 'vw';
      piece.style.animationDuration = duration + 's';

      if(shape === 'heart'){
        piece.textContent = '💗';
        piece.style.fontSize = (size + 6) + 'px';
      } else {
        piece.style.width = size + 'px';
        piece.style.height = size + 'px';
        piece.style.background = color;
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      }

      layer.appendChild(piece);
      setTimeout(() => piece.remove(), duration * 1000 + 200);
    }, i * 35);
  }
}

// =====================================================
// TYPED GREETING MESSAGE (scroll-triggered)
// =====================================================
(function typedMessage(){
  const el = document.getElementById('typed-message');
  const cursor = document.getElementById('typed-cursor');
  const section = document.getElementById('message-section');
  if(!el || !section) return;

  let typed = false;

  function typeText(){
    if(typed) return;
    typed = true;
    let i = 0;
    const speed = 32;
    function step(){
      if(i <= TYPED_GREETING.length){
        el.textContent = TYPED_GREETING.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else if(cursor){
        cursor.style.display = 'none';
      }
    }
    step();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) typeText();
    });
  }, { threshold: 0.4 });

  observer.observe(section);
})();

// =====================================================
// BACKGROUND MUSIC TOGGLE
// =====================================================
(function musicToggle(){
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  if(!btn || !audio) return;

  let isPlaying = false;

  btn.addEventListener('click', () => {
    if(!isPlaying){
      audio.play().then(() => {
        isPlaying = true;
        btn.classList.add('playing');
        btn.querySelector('.music-label').textContent = 'Jeda Lagu';
      }).catch(() => {
        // File musik belum ditambahkan atau browser memblokir autoplay.
        alert('Musik belum bisa diputar. Pastikan file music/lagu.mp3 sudah kamu tambahkan ke folder proyek.');
      });
    } else {
      audio.pause();
      isPlaying = false;
      btn.classList.remove('playing');
      btn.querySelector('.music-label').textContent = 'Putar Lagu';
    }
  });
})();

// =====================================================
// SIMPLE SCROLL-REVEAL FOR SECTIONS
// =====================================================
(function scrollReveal(){
  const targets = document.querySelectorAll('.cake-section, .gallery-section');
  targets.forEach(t => { t.style.opacity = 0; t.style.transform = 'translateY(24px)'; t.style.transition = 'opacity 0.7s ease, transform 0.7s ease'; });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => observer.observe(t));
})();