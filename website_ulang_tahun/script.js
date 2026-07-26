// ===============================
// UBAH DATA UTAMA DI BAGIAN INI
// ===============================
const CONFIG = {
  recipientName: "Sayang",
  senderName: "Aku",
  birthdayDateText: "Untuk hari spesialmu",
  slideDuration: 4300
};

// Mengisi nama dan tanggal secara otomatis.
document.querySelectorAll("[data-recipient]").forEach((el) => {
  el.textContent = CONFIG.recipientName;
});

document.querySelectorAll("[data-sender]").forEach((el) => {
  el.textContent = CONFIG.senderName;
});

document.getElementById("todayText").textContent = CONFIG.birthdayDateText;

const scenes = [...document.querySelectorAll(".scene")];

function showScene(id) {
  scenes.forEach((scene) => scene.classList.remove("active"));
  const target = document.getElementById(id);
  if (!target) return;
  target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showScene(button.dataset.next));
});

// Membuka amplop.
const envelopeButton = document.getElementById("envelopeButton");
let envelopeOpened = false;

envelopeButton.addEventListener("click", () => {
  if (envelopeOpened) return;
  envelopeOpened = true;
  envelopeButton.classList.add("opening");
  setTimeout(() => showScene("letter"), 1050);
});

// Mematikan lilin dan memunculkan kolom permintaan.
const cakeButton = document.getElementById("cakeButton");
const cakeStatus = document.getElementById("cakeStatus");
const wishModal = document.getElementById("wishModal");
const wishInput = document.getElementById("wishInput");
const saveWishButton = document.getElementById("saveWishButton");

cakeButton.addEventListener("click", () => {
  if (cakeButton.classList.contains("blown")) return;

  cakeButton.classList.add("blown");
  cakeStatus.textContent = "Lilin sudah padam. Saatnya membuat permintaanmu ♡";

  setTimeout(() => {
    wishModal.hidden = false;
    setTimeout(() => wishInput.focus(), 150);
  }, 650);
});

// Musik
const birthdaySong = document.getElementById("birthdaySong");
const musicToggle = document.getElementById("musicToggle");
const record = document.querySelector(".record");
let isMusicPlaying = false;

async function playMusic() {
  try {
    await birthdaySong.play();
    isMusicPlaying = true;
    musicToggle.textContent = "❚❚";
    musicToggle.setAttribute("aria-label", "Jeda musik");
    record.classList.add("spinning");
  } catch (error) {
    // Browser atau file musik mungkin belum tersedia.
    isMusicPlaying = false;
    musicToggle.textContent = "▶";
    record.classList.remove("spinning");
    console.info("Musik belum dapat diputar. Pastikan file MP3 sudah ditambahkan.", error);
  }
}

function pauseMusic() {
  birthdaySong.pause();
  isMusicPlaying = false;
  musicToggle.textContent = "▶";
  musicToggle.setAttribute("aria-label", "Putar musik");
  record.classList.remove("spinning");
}

musicToggle.addEventListener("click", () => {
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

// Menyimpan permintaan dan masuk ke tampilan akhir.
saveWishButton.addEventListener("click", () => {
  const wish = wishInput.value.trim();
  const savedWishText = document.getElementById("savedWishText");

  if (wish) {
    savedWishText.textContent = `“${wish}” — semoga alam semesta mendengarnya.`;
  } else {
    savedWishText.textContent = "Permintaanmu aman tersimpan di dalam hati.";
  }

  wishModal.hidden = true;
  showScene("finale");
  createConfetti();

  // Klik tombol ini termasuk interaksi pengguna, jadi browser biasanya mengizinkan audio.
  playMusic();
});

// Slideshow
const slides = [...document.querySelectorAll(".memory-slide")];
const slideDots = document.getElementById("slideDots");
let currentSlide = 0;
let slideTimer;

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = `slide-dot${index === 0 ? " active" : ""}`;
  dot.setAttribute("aria-label", `Tampilkan foto ${index + 1}`);
  dot.addEventListener("click", () => {
    showSlide(index);
    restartSlideTimer();
  });
  slideDots.appendChild(dot);
});

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  [...slideDots.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function restartSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    showSlide(currentSlide + 1);
  }, CONFIG.slideDuration);
}

restartSlideTimer();

// Confetti
function createConfetti() {
  const layer = document.getElementById("confetti");
  layer.innerHTML = "";
  const colors = ["#8f3559", "#ef8fad", "#d2a85d", "#8e6cca", "#75a9c6", "#f3b477"];

  for (let i = 0; i < 70; i += 1) {
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

// Mengulang seluruh pengalaman.
document.getElementById("restartButton").addEventListener("click", () => {
  pauseMusic();
  birthdaySong.currentTime = 0;
  wishInput.value = "";
  cakeButton.classList.remove("blown");
  cakeStatus.textContent = "Semua lilin masih menyala ✨";
  envelopeButton.classList.remove("opening");
  envelopeOpened = false;
  showSlide(0);
  showScene("intro");
});
