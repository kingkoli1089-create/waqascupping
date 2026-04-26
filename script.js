// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  }, 80);
});
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform='translate(-50%,-50%) scale(2)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform='translate(-50%,-50%) scale(1)'; });
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold:.15 });
reveals.forEach(el => io.observe(el));

// ── NUMBER COUNTER ANIMATION ──
function animateCounter(el, target, duration=1800) {
  let start = 0, step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + (el.dataset.suffix||''); clearInterval(timer); }
    else el.textContent = Math.floor(start) + (el.dataset.suffix||'');
  }, 16);
}
const numObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const text = el.textContent;
        const num = parseInt(text);
        if (!isNaN(num)) {
          const suffix = text.replace(String(num),'');
          el.dataset.suffix = suffix;
          animateCounter(el, num);
        }
      });
      numObserver.disconnect();
    }
  });
}, {threshold:.5});
const statsEl = document.querySelector('.stats-row');
if(statsEl) numObserver.observe(statsEl);

// ── PARTICLE SPARKLES ON CLICK ──
document.addEventListener('click', e => {
  for(let i=0;i<6;i++){
    const p = document.createElement('div');
    p.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:8px;height:8px;background:#D4A017;border-radius:50%;pointer-events:none;z-index:9999;animation:sparkle .6s forwards;transform:translate(-50%,-50%)`;
    const angle=Math.random()*360, dist=40+Math.random()*40;
    p.style.setProperty('--dx', Math.cos(angle*Math.PI/180)*dist+'px');
    p.style.setProperty('--dy', Math.sin(angle*Math.PI/180)*dist+'px');
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),700);
  }
});

// Add sparkle keyframes dynamically
const styleEl = document.createElement('style');
styleEl.textContent=`@keyframes sparkle{0%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0);opacity:0}}`;
document.head.appendChild(styleEl);
