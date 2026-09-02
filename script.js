/* ==========================================================================
   Royal Engagement Invitation - JavaScript Engine
   Praveen Kumar & Janani Selvi - Sep 17, 2026
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEnvelope();
  initCountdown();
  initPetalsCanvas();
  initAudio();
  initCalendar();
  initGallery();
  initWishes();
  initShare();
});

/* ==========================================================================
   1. ENVELOPE / TAP TO OPEN INTERACTION
   ========================================================================== */
function initEnvelope() {
  const envelopeScreen = document.getElementById('envelopeScreen');
  const envelopeContainer = document.getElementById('envelopeContainer');
  const waxSeal = document.getElementById('waxSeal');

  function openEnvelope() {
    if (envelopeScreen.classList.contains('opened')) return;

    envelopeContainer.classList.add('opening');
    
    // Play sound / background music
    startBackgroundMusic();

    // Trigger celebration sparks
    createSparkleBurst(window.innerWidth / 2, window.innerHeight / 2);

    setTimeout(() => {
      envelopeScreen.classList.add('opened');
    }, 900);
  }

  if (envelopeContainer) envelopeContainer.addEventListener('click', openEnvelope);
  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
}

/* ==========================================================================
   2. REALTIME LIVE COUNTDOWN (Target: Sep 17, 2026, 18:30:00 IST)
   ========================================================================== */
function initCountdown() {
  // Target: September 17, 2026 at 18:30:00 IST (+05:30)
  const targetDate = new Date('2026-09-17T18:30:00+05:30').getTime();

  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minutesEl = document.getElementById('cdMinutes');
  const secondsEl = document.getElementById('cdSeconds');

  function update() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      const cdTitle = document.querySelector('.countdown-title');
      if (cdTitle) cdTitle.textContent = "✨ Today is the Auspicious Day! ✨";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. FALLING JASMINE & ROSE PETALS (Canvas Particle System)
   ========================================================================== */
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = 28;
  const petals = [];

  // Petal types: 0 = Jasmine (Cream/White), 1 = Rose (Soft pink/ruby), 2 = Gold Sparkle
  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.2 + 0.8,
      speedX: Math.random() * 1.5 - 0.75,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.5 - 0.75,
      type: Math.random() > 0.5 ? 0 : Math.random() > 0.3 ? 1 : 2,
      opacity: Math.random() * 0.5 + 0.5
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;

    if (p.type === 0) {
      // Jasmine Petal (Cream White)
      ctx.fillStyle = '#fffdf0';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.7, p.size * 1.4, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.type === 1) {
      // Rose Petal (Soft Rose / Ruby)
      ctx.fillStyle = '#d98880';
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size, -p.size * 0.5, 0, p.size);
      ctx.quadraticCurveTo(-p.size, -p.size * 0.5, 0, -p.size);
      ctx.fill();
    } else {
      // Gold Sparkle particle
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX * 0.3;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      drawPetal(p);
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. CELEBRATION SPARK BURST
   ========================================================================== */
function createSparkleBurst(originX, originY) {
  const container = document.body;
  const colors = ['#ffd700', '#fff2b2', '#ff85a1', '#ffffff', '#e6ca65'];

  for (let i = 0; i < 40; i++) {
    const spark = document.createElement('div');
    spark.style.position = 'fixed';
    spark.style.left = originX + 'px';
    spark.style.top = originY + 'px';
    spark.style.width = Math.random() * 8 + 4 + 'px';
    spark.style.height = spark.style.width;
    spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    spark.style.borderRadius = '50%';
    spark.style.pointerEvents = 'none';
    spark.style.zIndex = '10001';
    spark.style.boxShadow = '0 0 10px ' + spark.style.backgroundColor;
    container.appendChild(spark);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 180 + 60;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity;

    spark.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
      ],
      {
        duration: Math.random() * 800 + 700,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      }
    ).onfinish = () => spark.remove();
  }
}

/* ==========================================================================
   5. AMBIENT WEDDING MUSIC (Custom MP3 with Synthesizer Fallback)
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let audioInterval = null;
let customAudioPlaying = false;

function initAudio() {
  const musicBtn = document.getElementById('musicBtn');
  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    if (isAudioPlaying) {
      stopBackgroundMusic();
    } else {
      startBackgroundMusic();
    }
  });
}

function startBackgroundMusic() {
  const musicBtn = document.getElementById('musicBtn');
  const bgAudio = document.getElementById('bgMusic');
  if (isAudioPlaying) return;

  // Try custom MP3/Audio file first
  if (bgAudio) {
    bgAudio.volume = 0.65;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isAudioPlaying = true;
        customAudioPlaying = true;
        if (musicBtn) {
          musicBtn.classList.add('playing');
          musicBtn.innerHTML = '🎵';
          musicBtn.title = "Pause Music";
        }
        return;
      }).catch(() => {
        // Fallback to synthesized wedding flute if no custom file exists yet
        playSynthWeddingMelody();
      });
      return;
    }
  }

  playSynthWeddingMelody();
}

function playSynthWeddingMelody() {
  const musicBtn = document.getElementById('musicBtn');
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isAudioPlaying = true;
    customAudioPlaying = false;
    if (musicBtn) {
      musicBtn.classList.add('playing');
      musicBtn.innerHTML = '🎵';
      musicBtn.title = "Pause Music";
    }

    // Melodic Indian Wedding Flute / Harpeggios in Raag Yaman / Bhupali
    const melodyNotes = [
      { freq: 261.63, dur: 0.8 }, // C4
      { freq: 293.66, dur: 0.8 }, // D4
      { freq: 329.63, dur: 1.2 }, // E4
      { freq: 392.00, dur: 0.8 }, // G4
      { freq: 440.00, dur: 1.2 }, // A4
      { freq: 523.25, dur: 1.6 }, // C5
      { freq: 440.00, dur: 0.8 }, // A4
      { freq: 392.00, dur: 0.8 }, // G4
      { freq: 329.63, dur: 1.2 }, // E4
      { freq: 293.66, dur: 1.0 }, // D4
      { freq: 261.63, dur: 2.0 }  // C4
    ];

    let noteIndex = 0;

    function playNextMelodyNote() {
      if (!isAudioPlaying || !audioCtx || customAudioPlaying) return;

      const note = melodyNotes[noteIndex];
      const now = audioCtx.currentTime;

      // Soft Flute Tone
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now);

      // Warm harmonic shimmer
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(note.freq * 2, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.dur);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.02, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + note.dur);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + note.dur);
      osc2.stop(now + note.dur);

      noteIndex = (noteIndex + 1) % melodyNotes.length;
      audioInterval = setTimeout(playNextMelodyNote, note.dur * 1000);
    }

    playNextMelodyNote();
  } catch (e) {
    console.log('Audio init notice:', e);
  }
}

function stopBackgroundMusic() {
  isAudioPlaying = false;
  const bgAudio = document.getElementById('bgMusic');
  if (bgAudio) {
    bgAudio.pause();
  }
  if (audioInterval) clearTimeout(audioInterval);
  const musicBtn = document.getElementById('musicBtn');
  if (musicBtn) {
    musicBtn.classList.remove('playing');
    musicBtn.innerHTML = '🔇';
    musicBtn.title = "Play Music";
  }
}

/* ==========================================================================
   6. 1-CLICK CALENDAR SYNC (Google Calendar & iCal)
   ========================================================================== */
function initCalendar() {
  const gcalBtn = document.getElementById('btnGoogleCal');
  const icalBtn = document.getElementById('btnICal');

  const title = encodeURIComponent("Engagement Ceremony of Praveen Kumar & Janani Selvi");
  const details = encodeURIComponent("You're warmly invited to celebrate the joyful Engagement Ceremony of Praveen Kumar (B.Sc, MBA) & Janani Selvi (B.E).\nVenue: RK Grand Banquet Hall, Mogappair West.\nTime: 6:30 PM onwards.");
  const location = encodeURIComponent("RK Grand Banquet Hall, Mogappair West, Chennai, Tamil Nadu");
  
  // Start: 20260917T183000 (IST = UTC+5:30 -> 13:00 UTC)
  // End: 20260917T220000 (IST = 16:30 UTC)
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260917T130000Z/20260917T163000Z&details=${details}&location=${location}`;

  if (gcalBtn) {
    gcalBtn.href = gcalUrl;
    gcalBtn.target = "_blank";
  }

  if (icalBtn) {
    icalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Praveen & Janani Engagement//EN",
        "BEGIN:VEVENT",
        "UID:engagement-praveen-janani-2026@wedding.com",
        "DTSTAMP:20260901T000000Z",
        "DTSTART:20260917T130000Z",
        "DTEND:20260917T163000Z",
        "SUMMARY:Engagement Ceremony of Praveen Kumar & Janani Selvi",
        "DESCRIPTION:Join us for the Engagement Ceremony of Praveen Kumar & Janani Selvi at RK Grand Banquet Hall.",
        "LOCATION:RK Grand Banquet Hall, Mogappair West, Chennai",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "Praveen_Janani_Engagement.ics");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

/* ==========================================================================
   7. 3D COVERFLOW PHOTO GALLERY (Original Orientation & Guaranteed Auto-Spin)
   ========================================================================== */
function initGallery() {
  const stage = document.getElementById('coverflowStage');
  const items = document.querySelectorAll('.coverflow-item');
  const prevBtn = document.getElementById('cfPrevBtn');
  const nextBtn = document.getElementById('cfNextBtn');
  const autoBtn = document.getElementById('cfAutoBtn');
  const dotsContainer = document.getElementById('coverflowDots');

  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');

  if (!stage || items.length === 0) return;

  const totalPhotos = items.length;
  let activeIndex = 0;
  let isAutoSpin = true;
  let isUserInteracting = false;
  let interactionTimer = null;

  function pauseInteractionTemporarily(durationMs = 3000) {
    isUserInteracting = true;
    if (interactionTimer) clearTimeout(interactionTimer);
    interactionTimer = setTimeout(() => {
      isUserInteracting = false;
    }, durationMs);
  }

  // Adapt card size to match each photo's original orientation
  function adjustItemOrientation(item, img) {
    if (!img.naturalWidth || !img.naturalHeight) return;
    const isLandscape = img.naturalWidth > img.naturalHeight;
    const isMobile = window.innerWidth < 600;

    if (isLandscape) {
      item.style.width = isMobile ? '280px' : '360px';
      item.style.height = isMobile ? '200px' : '255px';
    } else {
      item.style.width = isMobile ? '200px' : '255px';
      item.style.height = isMobile ? '285px' : '360px';
    }
  }

  items.forEach((item) => {
    const img = item.querySelector('img');
    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        adjustItemOrientation(item, img);
      } else {
        img.addEventListener('load', () => adjustItemOrientation(item, img));
      }
    }
  });

  // Build Indicator Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPhotos; i++) {
      const dot = document.createElement('div');
      dot.className = 'cf-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        updateCoverflow(i);
        pauseInteractionTemporarily(3500);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateCoverflow(newIndex) {
    if (newIndex < 0) newIndex = totalPhotos - 1;
    if (newIndex >= totalPhotos) newIndex = 0;
    activeIndex = newIndex;

    const isMobile = window.innerWidth < 600;
    const spacing = isMobile ? 60 : 105;
    const baseOffset = isMobile ? 85 : 155;

    items.forEach((item, i) => {
      const diff = i - activeIndex;

      if (diff === 0) {
        // Active Center Photo
        item.style.transform = `translateX(0px) translateZ(90px) rotateY(0deg) scale(1.04)`;
        item.style.opacity = '1';
        item.style.zIndex = '100';
        item.style.filter = 'brightness(1)';
        item.classList.add('active');
      } else if (diff < 0) {
        // Left Cards
        const absDiff = Math.abs(diff);
        const tx = -1 * (absDiff * spacing + baseOffset);
        const tz = -100 - absDiff * 40;
        const ry = 40;
        const opacity = Math.max(0, 1 - absDiff * 0.22);
        const scale = Math.max(0.7, 1 - absDiff * 0.08);

        item.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
        item.style.opacity = opacity.toString();
        item.style.zIndex = (100 - absDiff).toString();
        item.style.filter = 'brightness(0.65)';
        item.classList.remove('active');
      } else {
        // Right Cards
        const tx = diff * spacing + baseOffset;
        const tz = -100 - diff * 40;
        const ry = -40;
        const opacity = Math.max(0, 1 - diff * 0.22);
        const scale = Math.max(0.7, 1 - diff * 0.08);

        item.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
        item.style.opacity = opacity.toString();
        item.style.zIndex = (100 - diff).toString();
        item.style.filter = 'brightness(0.65)';
        item.classList.remove('active');
      }
    });

    // Update Dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.cf-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    }
  }

  // Initial draw
  updateCoverflow(0);

  window.addEventListener('resize', () => {
    items.forEach((item) => {
      const img = item.querySelector('img');
      if (img) adjustItemOrientation(item, img);
    });
    updateCoverflow(activeIndex);
  });

  // Dedicated Robust Auto-Spin Loop
  setInterval(() => {
    if (isAutoSpin && !isUserInteracting) {
      const isLightboxOpen = lightbox && lightbox.classList.contains('active');
      if (!isLightboxOpen) {
        updateCoverflow(activeIndex + 1);
      }
    }
  }, 2500);

  if (autoBtn) {
    autoBtn.addEventListener('click', () => {
      isAutoSpin = !isAutoSpin;
      autoBtn.textContent = isAutoSpin ? '⏸️' : '▶️';
      if (isAutoSpin) isUserInteracting = false;
    });
  }

  // Navigation Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateCoverflow(activeIndex - 1);
      pauseInteractionTemporarily(3000);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateCoverflow(activeIndex + 1);
      pauseInteractionTemporarily(3000);
    });
  }

  // Card Click Interaction
  items.forEach((item, idx) => {
    item.addEventListener('click', () => {
      if (idx === activeIndex) {
        openLightbox(activeIndex);
      } else {
        updateCoverflow(idx);
        pauseInteractionTemporarily(3000);
      }
    });
  });

  // Touch Swipe & Mouse Drag
  let startX = 0;
  let isDragging = false;

  stage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    isUserInteracting = true;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      pauseInteractionTemporarily(3000);
    }
  });

  stage.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diffX = e.clientX - startX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) updateCoverflow(activeIndex - 1);
      else updateCoverflow(activeIndex + 1);
      isDragging = false;
      pauseInteractionTemporarily(3000);
    }
  });

  stage.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      startX = e.touches[0].clientX;
      isUserInteracting = true;
    }
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    if (e.changedTouches.length > 0) {
      const diffX = e.changedTouches[0].clientX - startX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) updateCoverflow(activeIndex - 1);
        else updateCoverflow(activeIndex + 1);
      }
      pauseInteractionTemporarily(3000);
    }
  }, { passive: true });

  // Lightbox Viewer
  function openLightbox(index) {
    if (index < 0) index = totalPhotos - 1;
    if (index >= totalPhotos) index = 0;
    activeIndex = index;

    const targetItem = items[activeIndex];
    if (targetItem && lightboxImg) {
      const img = targetItem.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        if (lightboxCounter) {
          lightboxCounter.textContent = `Photo ${activeIndex + 1} of ${totalPhotos}`;
        }
        if (lightbox) lightbox.classList.add('active');
        isUserInteracting = true;
      }
    }
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(activeIndex - 1);
      updateCoverflow(activeIndex);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(activeIndex + 1);
      updateCoverflow(activeIndex);
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightbox) lightbox.classList.remove('active');
      pauseInteractionTemporarily(2000);
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrap')) {
        lightbox.classList.remove('active');
        pauseInteractionTemporarily(2000);
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        pauseInteractionTemporarily(2000);
      }
      if (e.key === 'ArrowLeft') { openLightbox(activeIndex - 1); updateCoverflow(activeIndex); }
      if (e.key === 'ArrowRight') { openLightbox(activeIndex + 1); updateCoverflow(activeIndex); }
    }
  });
}

/* ==========================================================================
   8. GOOGLE SHEETS CLOUD GUESTBOOK & ADMIN DELETE SYSTEM
   ========================================================================== */
// 👉 Connected Google Apps Script Web App for Lifetime Cloud Storage:
const GOOGLE_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbw1RzN-MasuNxWNrAtIHJj_Crq0C6TUWHkE15dUzeK42TKWHB9VavzhTEsqx2xn9uXTvA/exec";
const ADMIN_SECRET_PIN = "1709"; // Secret PIN to delete wishes

function initWishes() {
  const form = document.getElementById('wishesForm');
  const nameInput = document.getElementById('wishName');
  const msgInput = document.getElementById('wishMessage');
  const wishesList = document.getElementById('wishesList');
  const adminStatusArea = document.getElementById('adminStatusArea');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  let isAdmin = false;

  // Default initial sample wishes if cloud sheet is empty
  const defaultWishes = [
    { id: "1", name: "Karthik & Family", message: "Hearty congratulations to Praveen and Janani! Wishing you both a lifetime of happiness, love, and togetherness! ✨❤️", time: "Just now" },
    { id: "2", name: "Divya Ramesh", message: "So happy for you both! Looking forward to celebrating on September 17th! 🎉💍", time: "1 hour ago" },
    { id: "3", name: "Suresh Kumar", message: "Congratulations Praveen & Janani! May God shower endless blessings upon your new journey. 🌸🙏", time: "Yesterday" }
  ];

  let currentWishes = [];
  try {
    const cached = localStorage.getItem('praveen_janani_cloud_wishes');
    currentWishes = cached ? JSON.parse(cached) : defaultWishes;
  } catch (e) {
    currentWishes = defaultWishes;
  }

  function formatDisplayTime(rawTime) {
    if (!rawTime) return "Recent";
    if (rawTime.includes("GMT") || rawTime.length > 25) {
      try {
        const d = new Date(rawTime);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
        }
      } catch (e) {}
    }
    return rawTime;
  }

  function renderWishes() {
    if (!wishesList) return;
    wishesList.innerHTML = '';

    if (adminStatusArea) {
      if (isAdmin) {
        adminStatusArea.style.display = 'block';
        adminStatusArea.innerHTML = `
          <div class="admin-status-badge">
            <span>👑</span> Admin Mode Active • You can delete any message
          </div>
        `;
      } else {
        adminStatusArea.style.display = 'none';
      }
    }

    if (currentWishes.length === 0) {
      wishesList.innerHTML = '<div style="color: var(--cream-muted); font-size: 0.9rem; padding: 15px;">No wishes yet. Be the first to bless the couple! 🌸</div>';
      return;
    }

    currentWishes.forEach(w => {
      const card = document.createElement('div');
      card.className = 'wish-card';
      card.innerHTML = `
        <div class="wish-header">
          <span class="wish-author">${escapeHTML(w.name)}</span>
          <div class="wish-header-right">
            <span class="wish-time">${escapeHTML(formatDisplayTime(w.time))}</span>
            ${isAdmin ? `<button class="wish-delete-btn" data-id="${escapeHTML(w.id)}" title="Delete message">🗑️ Delete</button>` : ''}
          </div>
        </div>
        <div class="wish-body">${escapeHTML(w.message)}</div>
      `;

      if (isAdmin) {
        const delBtn = card.querySelector('.wish-delete-btn');
        if (delBtn) {
          delBtn.addEventListener('click', () => deleteWish(w.id, w.name));
        }
      }

      wishesList.appendChild(card);
    });
  }

  renderWishes();

  // 1. Fetch Real Wishes from Google Sheet on Page Load
  async function fetchCloudWishes() {
    try {
      const res = await fetch(GOOGLE_SHEET_API_URL);
      const data = await res.json();
      if (data && data.status === "success" && Array.isArray(data.wishes) && data.wishes.length > 0) {
        currentWishes = data.wishes;
        try {
          localStorage.setItem('praveen_janani_cloud_wishes', JSON.stringify(currentWishes));
        } catch (e) {}
        renderWishes();
      }
    } catch (err) {
      console.log("Using cached wishes:", err);
    }
  }

  fetchCloudWishes();

  // 2. Submit New Wish to Google Sheet
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const msg = msgInput.value.trim();

      if (!name || !msg) return;

      const tempId = String(Date.now());
      const tempTime = "Just now";

      const newWish = {
        id: tempId,
        name: name,
        message: msg,
        time: tempTime
      };

      // Optimistic UI update
      currentWishes.unshift(newWish);
      renderWishes();
      nameInput.value = '';
      msgInput.value = '';

      // Sparkle celebration
      createSparkleBurst(window.innerWidth / 2, window.innerHeight / 2);

      // Save locally
      try {
        localStorage.setItem('praveen_janani_cloud_wishes', JSON.stringify(currentWishes));
      } catch (err) {}

      // Cloud save to Google Sheet
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳</span> Saving Blessing...';
      }

      try {
        await fetch(GOOGLE_SHEET_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'add',
            name: name,
            message: msg
          })
        });
        setTimeout(fetchCloudWishes, 2000);
      } catch (postErr) {
        console.log("Cloud sync error:", postErr);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>💌</span> Send Blessing';
        }
      }
    });
  }

  // 3. Admin Delete Wish Function
  async function deleteWish(wishId, authorName) {
    const confirmDelete = confirm(`Admin: Are you sure you want to delete the blessing from "${authorName}"?`);
    if (!confirmDelete) return;

    currentWishes = currentWishes.filter(w => String(w.id) !== String(wishId));
    renderWishes();
    try {
      localStorage.setItem('praveen_janani_cloud_wishes', JSON.stringify(currentWishes));
    } catch (e) {}

    // Cloud Delete in Google Sheet
    try {
      await fetch(GOOGLE_SHEET_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'delete',
          id: wishId,
          adminPin: ADMIN_SECRET_PIN
        })
      });
      setTimeout(fetchCloudWishes, 2000);
    } catch (delErr) {
      console.log("Delete error:", delErr);
    }
  }

  // 4. Secret Admin Activation (Tap the top PJ Monogram 3 times)
  let pjClickCount = 0;
  let pjClickTimer = null;
  const pjCrest = document.querySelector('.pj-monogram-crest');

  if (pjCrest) {
    pjCrest.style.cursor = 'pointer';
    pjCrest.addEventListener('click', () => {
      pjClickCount++;
      clearTimeout(pjClickTimer);
      pjClickTimer = setTimeout(() => { pjClickCount = 0; }, 1500);

      if (pjClickCount >= 3) {
        pjClickCount = 0;
        const pin = prompt("👑 Enter Admin Secret PIN to manage guest wishes:");
        if (pin === ADMIN_SECRET_PIN) {
          isAdmin = true;
          renderWishes();
          alert("✅ Admin Mode Activated! You can now delete any blessing with the red Delete button.");
        } else if (pin !== null) {
          alert("❌ Incorrect PIN.");
        }
      }
    });
  }

  // Check URL query parameter: ?admin=1709
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === ADMIN_SECRET_PIN) {
    isAdmin = true;
    renderWishes();
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   9. WHATSAPP INVITATION SHARE
   ========================================================================== */
function initShare() {
  const shareBtn = document.getElementById('shareInviteBtn');
  const shareQuickBtn = document.getElementById('shareQuickBtn');

  const shareText = `💍 *Engagement Ceremony Invitation* 💍\n\nWe cordially invite you to celebrate the joyous engagement ceremony of:\n\n*PRAVEEN KUMAR (B.Sc, MBA)*\n&\n*JANANI SELVI (B.E)*\n\n📅 *Date:* Thursday, September 17, 2026\n⏰ *Time:* 6:30 PM Onwards\n📍 *Venue:* RK Grand Banquet Hall, Mogappair West\n\n👉 *View the full interactive invitation & venue directions here:*\n${window.location.href}`;

  function triggerShare() {
    if (navigator.share) {
      navigator.share({
        title: 'Engagement Invitation - Praveen & Janani',
        text: shareText,
        url: window.location.href
      }).catch(() => {
        openWhatsAppShare();
      });
    } else {
      openWhatsAppShare();
    }
  }

  function openWhatsAppShare() {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  }

  if (shareBtn) shareBtn.addEventListener('click', triggerShare);
  if (shareQuickBtn) shareQuickBtn.addEventListener('click', triggerShare);
}
