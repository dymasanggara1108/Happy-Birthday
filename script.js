// ========================================
// DATA UTAMA YANG BOLEH DIUBAH
// ========================================
const CONFIG = {
  recipientName: "Retno Ngesti Agustin",
  senderName: "Dymas Anggara",
  birthdayDateText: "15 Agustus 2026",
  birthdayAge: 22,
  accessPassword: "15082004",
  romanticInterval: 4700,
  romanticLines: [
    "Di antara banyak hal indah di dunia, bertemu denganmu adalah salah satu yang paling kusyukuri.",
    "Senyummu selalu punya cara sederhana untuk membuat hariku terasa lebih baik.",
    "Aku tidak membutuhkan kisah yang sempurna, selama di dalam ceritanya selalu ada kamu.",
    "Terima kasih karena sudah menjadi rumah bagi cerita, tawa, dan segala perasaanku.",
    "Semoga setiap langkahmu selalu menemukan bahagia, dan semoga aku masih boleh berjalan di sampingmu.",
    "Kamu bukan hanya seseorang yang kusayang, tetapi juga alasan banyak kenangan terasa begitu berarti.",
    "Ketika dunia terasa ramai, kehadiranmu adalah tenang yang selalu ingin kutemukan.",
    "Aku berharap ulang tahun ini membawa lebih banyak cinta daripada yang pernah kamu bayangkan.",
    "Apa pun yang terjadi nanti, kenangan tentangmu akan selalu memiliki tempat paling lembut di hatiku.",
    "Selamat ulang tahun, manusia istimewa. Tetaplah menjadi kamu yang selalu membuatku jatuh cinta."
  ]
};

// ========================================
// ELEMEN DASAR
// ========================================
const scenes = [...document.querySelectorAll(".scene")];
const envelopeButton = document.getElementById("envelopeButton");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordMessage = document.getElementById("passwordMessage");
const togglePassword = document.getElementById("togglePassword");
const cakeButton = document.getElementById("cakeButton");
const cakeStatus = document.getElementById("cakeStatus");
const wishModal = document.getElementById("wishModal");
const wishInput = document.getElementById("wishInput");
const saveWishButton = document.getElementById("saveWishButton");
const introSong = document.getElementById("introSong");
const birthdaySong = document.getElementById("birthdaySong");
const musicToggle = document.getElementById("musicToggle");
const musicStatus = document.getElementById("musicStatus");
const record = document.querySelector(".record");
const finaleScene = document.getElementById("finale");
const roseRain = document.getElementById("roseRain");
const romanticMessage = document.getElementById("romanticMessage");
const restartButton = document.getElementById("restartButton");

let envelopeOpened = false;
let passwordAttempts = 0;
let isMusicPlaying = false;
let romanticIndex = 0;
let romanticTimer = null;
let romanticFadeTimer = null;

// Isi nama dan tanggal.
document.querySelectorAll("[data-recipient]").forEach((element) => {
  element.textContent = CONFIG.recipientName;
});

document.querySelectorAll("[data-sender]").forEach((element) => {
  element.textContent = CONFIG.senderName;
});

const todayText = document.getElementById("todayText");
if (todayText) {
  todayText.textContent = CONFIG.birthdayDateText;
}

document.querySelectorAll("[data-birthday-date]").forEach((element) => {
  element.textContent = CONFIG.birthdayDateText;
});

document.querySelectorAll("[data-age]").forEach((element) => {
  element.textContent = CONFIG.birthdayAge;
});

// ========================================
// MUSIK PEMBUKA
// ========================================
let introAutoplayUnlocked = false;

async function playIntroMusic() {
  if (!introSong || introAutoplayUnlocked || !birthdaySong?.paused) return;

  try {
    await introSong.play();
    introAutoplayUnlocked = true;
  } catch (error) {
    // Browser modern dapat memblokir autoplay bersuara.
    // Musik akan dicoba lagi pada interaksi pertama pengguna.
    console.info("Autoplay musik pembuka menunggu interaksi pengguna.", error);
  }
}

function stopIntroMusic(reset = true) {
  if (!introSong) return;

  introSong.pause();
  if (reset) introSong.currentTime = 0;
  introAutoplayUnlocked = true;
}

function unlockIntroMusicOnce() {
  if (!birthdaySong?.paused) return;
  playIntroMusic();
}

document.addEventListener("pointerdown", unlockIntroMusicOnce, { once: true });
document.addEventListener("keydown", unlockIntroMusicOnce, { once: true });

// Coba mulai sejak halaman pertama kali dimuat.
playIntroMusic();

// ========================================
// PERPINDAHAN HALAMAN
// ========================================
function showScene(id) {
  scenes.forEach((scene) => scene.classList.remove("active"));

  const target = document.getElementById(id);
  if (!target) return;

  target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    showScene(button.dataset.next);
  });
});

// ========================================
// AMPLOP DAN SURAT
// ========================================
envelopeButton?.addEventListener("click", () => {
  if (envelopeOpened) return;

  envelopeOpened = true;
  envelopeButton.classList.add("opening");

  window.setTimeout(() => {
    showScene("birthdayWelcome");
  }, 1050);
});

// ========================================
// GERBANG PASSWORD SEBELUM SURAT
// ========================================
function setPasswordMessage(message = "", type = "") {
  if (!passwordMessage) return;

  passwordMessage.textContent = message;
  passwordMessage.classList.remove("error", "hint", "success");
  if (type) passwordMessage.classList.add(type);
}

passwordForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredPassword = passwordInput?.value.trim() ?? "";

  if (enteredPassword === CONFIG.accessPassword) {
    passwordAttempts = 0;
    setPasswordMessage("Sandi benar. Surat ini memang untukmu ♡", "success");

    window.setTimeout(() => {
      if (passwordInput) passwordInput.value = "";
      setPasswordMessage();
      showScene("letter");
    }, 550);
    return;
  }

  passwordAttempts += 1;
  passwordInput?.classList.remove("shake");
  void passwordInput?.offsetWidth;
  passwordInput?.classList.add("shake");

  if (passwordAttempts > 3) {
    setPasswordMessage("hari ulang tahunmu", "hint");
  } else {
    setPasswordMessage(`Sandi belum tepat. Percobaan ${passwordAttempts} dari 3 sebelum petunjuk muncul.`, "error");
  }

  if (passwordInput) {
    passwordInput.select();
    passwordInput.focus();
  }
});

togglePassword?.addEventListener("click", () => {
  if (!passwordInput || !togglePassword) return;

  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "Sembunyikan" : "Lihat";
  togglePassword.setAttribute("aria-label", isHidden ? "Sembunyikan sandi" : "Tampilkan sandi");
  passwordInput.focus();
});

// ========================================
// KUE DAN PERMINTAAN
// ========================================
cakeButton?.addEventListener("click", () => {
  if (cakeButton.classList.contains("blown")) return;

  cakeButton.classList.add("blown");
  cakeStatus.textContent = "Lilin sudah padam. Saatnya membuat permintaanmu ♡";

  window.setTimeout(() => {
    wishModal.hidden = false;
    window.setTimeout(() => wishInput.focus(), 150);
  }, 650);
});

// ========================================
// KATA-KATA ROMANTIS BERGANTIAN
// ========================================
function showRomanticLine(index, immediate = false) {
  if (!romanticMessage || CONFIG.romanticLines.length === 0) return;

  window.clearTimeout(romanticFadeTimer);
  romanticMessage.classList.remove("visible");

  const updateText = () => {
    romanticMessage.textContent = CONFIG.romanticLines[index];
    requestAnimationFrame(() => {
      romanticMessage.classList.add("visible");
    });
  };

  if (immediate) {
    updateText();
  } else {
    romanticFadeTimer = window.setTimeout(updateText, 320);
  }
}

function startRomanticMessages() {
  stopRomanticMessages(false);
  showRomanticLine(romanticIndex, true);

  romanticTimer = window.setInterval(() => {
    romanticIndex = (romanticIndex + 1) % CONFIG.romanticLines.length;
    showRomanticLine(romanticIndex);
  }, CONFIG.romanticInterval);
}

function stopRomanticMessages(hideMessage = false) {
  window.clearInterval(romanticTimer);
  window.clearTimeout(romanticFadeTimer);
  romanticTimer = null;
  romanticFadeTimer = null;

  if (hideMessage && romanticMessage) {
    romanticMessage.classList.remove("visible");
  }
}

// ========================================
// KELOPAK MAWAR MEWAH
// ========================================
function createLuxuryRoseRain() {
  if (!roseRain) return;

  roseRain.innerHTML = "";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmallScreen = window.innerWidth <= 600;
  const petalCount = reduceMotion ? 12 : (isSmallScreen ? 40 : 72);
  const bloomCount = reduceMotion ? 3 : (isSmallScreen ? 7 : 12);
  const petalStyles = ["velvet", "blush", "ruby", "champagne"];

  for (let index = 0; index < petalCount; index += 1) {
    const petal = document.createElement("span");
    const styleName = petalStyles[Math.floor(Math.random() * petalStyles.length)];
    const size = 10 + Math.random() * 20;

    petal.className = `rose-petal ${styleName}`;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.32}px`;
    const sway = Math.random() * 240 - 120;
    const spin = 360 + Math.random() * 900;

    petal.style.setProperty("--fall-duration", `${7 + Math.random() * 8}s`);
    petal.style.setProperty("--fall-delay", `${Math.random() * -14}s`);
    petal.style.setProperty("--petal-sway-a", `${sway * 0.35}px`);
    petal.style.setProperty("--petal-sway-b", `${sway * -0.28}px`);
    petal.style.setProperty("--petal-sway", `${sway}px`);
    petal.style.setProperty("--petal-spin-a", `${spin * 0.35}deg`);
    petal.style.setProperty("--petal-spin-b", `${spin * 0.67}deg`);
    petal.style.setProperty("--petal-spin", `${spin}deg`);
    petal.style.setProperty("--petal-depth", `${0.65 + Math.random() * 0.8}`);
    petal.style.opacity = `${0.62 + Math.random() * 0.36}`;
    roseRain.appendChild(petal);
  }

  for (let index = 0; index < bloomCount; index += 1) {
    const bloom = document.createElement("span");
    bloom.className = "rose-bloom";
    bloom.textContent = "🌹";
    bloom.style.left = `${Math.random() * 100}%`;
    bloom.style.fontSize = `${20 + Math.random() * 21}px`;
    const bloomSway = Math.random() * 180 - 90;

    bloom.style.setProperty("--bloom-duration", `${10 + Math.random() * 8}s`);
    bloom.style.setProperty("--bloom-delay", `${Math.random() * -16}s`);
    bloom.style.setProperty("--bloom-sway", `${bloomSway}px`);
    bloom.style.setProperty("--bloom-sway-mid", `${bloomSway * -0.4}px`);
    roseRain.appendChild(bloom);
  }

  for (let index = 0; index < 18; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "rose-sparkle";
    sparkle.textContent = index % 2 === 0 ? "✦" : "✧";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.fontSize = `${8 + Math.random() * 12}px`;
    sparkle.style.animationDelay = `${Math.random() * 4}s`;
    roseRain.appendChild(sparkle);
  }
}

// ========================================
// MUSIK DAN SINKRONISASI EFEK
// ========================================
function setMusicVisualState(playing) {
  isMusicPlaying = playing;
  finaleScene?.classList.toggle("music-playing", playing);
  record?.classList.toggle("spinning", playing);

  if (musicToggle) {
    musicToggle.textContent = playing ? "❚❚" : "▶";
    musicToggle.setAttribute("aria-label", playing ? "Jeda musik" : "Putar musik");
  }

  if (playing) {
    startRomanticMessages();
    if (musicStatus) {
      musicStatus.textContent = "Musik diputar — kenangan, kata romantis, dan kelopak mawar sedang bergerak.";
    }
  } else {
    stopRomanticMessages(false);
    if (musicStatus && birthdaySong.readyState > 0) {
      musicStatus.textContent = "Musik dijeda. Tekan play untuk melanjutkan kenangan.";
    }
  }
}

async function playMusic() {
  if (!birthdaySong) return;

  try {
    await birthdaySong.play();
  } catch (error) {
    setMusicVisualState(false);

    if (musicStatus) {
      musicStatus.textContent =
        "Musik belum dapat diputar. Pastikan file lagu tersedia, lalu tekan play kembali.";
    }

    console.info(
      "Audio belum dapat diputar. Ganti assets/music/shape-of-my-heart.mp3 dengan file MP3 yang valid.",
      error
    );
  }
}

function pauseMusic() {
  birthdaySong?.pause();
}

birthdaySong?.addEventListener("play", () => {
  // Lagu pembuka harus berhenti ketika lagu utama finale dimulai.
  stopIntroMusic(true);
  setMusicVisualState(true);
});

birthdaySong?.addEventListener("pause", () => {
  setMusicVisualState(false);
});

birthdaySong?.addEventListener("ended", () => {
  setMusicVisualState(false);
});

birthdaySong?.addEventListener("error", () => {
  setMusicVisualState(false);

  if (musicStatus) {
    musicStatus.textContent =
      "File musik tidak dapat dibaca. Silakan ganti file MP3 pada folder assets/music.";
  }
});

musicToggle?.addEventListener("click", () => {
  if (birthdaySong.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
});

// ========================================
// MASUK KE HALAMAN PENUTUP
// ========================================
saveWishButton?.addEventListener("click", () => {
  const wish = wishInput.value.trim();
  const savedWishText = document.getElementById("savedWishText");

  if (savedWishText) {
    savedWishText.textContent = wish
      ? `“${wish}” — semoga alam semesta mendengarnya.`
      : "Permintaanmu aman tersimpan di dalam hati.";
  }

  wishModal.hidden = true;
  romanticIndex = 0;
  createLuxuryRoseRain();
  createConfetti();
  showScene("finale");

  // Pemutaran dipanggil langsung setelah klik agar diizinkan browser.
  playMusic();
});

// ========================================
// CONFETTI PEMBUKA
// ========================================
function createConfetti() {
  const layer = document.getElementById("confetti");
  if (!layer) return;

  layer.innerHTML = "";
  const colors = ["#8f3559", "#ef8fad", "#d2a85d", "#8e6cca", "#f3b477"];

  for (let index = 0; index < 55; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    piece.style.animationDuration = `${3.5 + Math.random() * 3.5}s`;
    piece.style.animationDelay = `${Math.random() * 1.8}s`;
    layer.appendChild(piece);
  }
}

// ========================================
// ULANGI DARI AWAL
// ========================================
restartButton?.addEventListener("click", () => {
  pauseMusic();
  stopRomanticMessages(true);

  if (birthdaySong) {
    birthdaySong.currentTime = 0;
  }

  if (introSong) {
    introSong.currentTime = 0;
    introAutoplayUnlocked = false;
    playIntroMusic();
  }

  wishInput.value = "";
  passwordAttempts = 0;
  if (passwordInput) {
    passwordInput.value = "";
    passwordInput.type = "password";
    passwordInput.classList.remove("shake");
  }
  if (togglePassword) {
    togglePassword.textContent = "Lihat";
    togglePassword.setAttribute("aria-label", "Tampilkan sandi");
  }
  setPasswordMessage();
  cakeButton?.classList.remove("blown");
  cakeStatus.textContent = "Semua lilin masih menyala ✨";
  envelopeButton?.classList.remove("opening");
  envelopeOpened = false;
  romanticIndex = 0;

  if (roseRain) {
    roseRain.innerHTML = "";
  }

  const confettiLayer = document.getElementById("confetti");
  if (confettiLayer) {
    confettiLayer.innerHTML = "";
  }

  if (romanticMessage) {
    romanticMessage.textContent =
      "Tekan tombol play dan biarkan setiap kata menyampaikan perasaanku.";
  }

  if (musicStatus) {
    musicStatus.textContent =
      "Efek foto, kata romantis, dan kelopak mawar aktif saat musik diputar.";
  }

  showScene("intro");
});
