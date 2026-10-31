
/* =====================================
   SAKURA LOVE LETTER 🌸
   Kuis + WhatsApp
===================================== */

// GANTI dengan nomor WhatsApp tujuan
// Format: kode negara + nomor, tanpa tanda +
const NOMOR_WHATSAPP = "62882006883497";

// Daftar pertanyaan kuis
const questions = [
  {
    question: "Siapa nama orang spesial yang ada di hati kamu? 💗",
    answers: [
      "hasan",
      "jaehyun",
      "Rahasia 🤭"
    ]
  },
  {
    question: "Apa yang paling kamu suka? 🌸",
    answers: [
      "Senyummu",
      "Kebersamaan kita",
      "Semua tentangmu"
    ]
  },
  {
    question: "Mau lihat kejutan terakhir? 🎁",
    answers: [
      "Mau banget!",
      "Tentu saja 💗",
      "Buka sekarang!"
    ]
  }
];

let questionIndex = 0;
let quizFinished = false;
const jawabanPengunjung = [];

// Ambil elemen HTML
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextQuestion");

// Kirim jawaban melalui WhatsApp
function notifyWhatsApp(question, answer) {
  const pesan = [
    "🌸 SAKURA LOVE LETTER 🌸",
    "",
    "Ada jawaban kuis baru!",
    "",
    "Pertanyaan: " + question,
    "Jawaban: " + answer,
    "",
    "💌 Dari kuis Sakura Love Letter"
  ].join("\n");

  const url =
    "https://wa.me/" +
    NOMOR_WHATSAPP +
    "?text=" +
    encodeURIComponent(pesan);

  // Membuka WhatsApp; pengunjung harus menekan Kirim
  window.open(url, "_blank");
}

// Tampilkan pertanyaan
function renderQuestion() {
  if (!questionElement || !answersElement || !nextButton) {
    console.error(
      "Elemen kuis tidak ditemukan. Periksa ID di HTML."
    );
    return;
  }

  const q = questions[questionIndex];

  questionElement.textContent = q.question;
  answersElement.innerHTML = "";
  nextButton.hidden = true;

  q.answers.forEach((answer) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => {
      if (quizFinished) return;

      // Cegah jawaban dipilih berkali-kali
      answersElement
        .querySelectorAll("button")
        .forEach((btn) => {
          btn.disabled = true;
        });

      button.classList.add("selected");

      // Simpan jawaban
      jawabanPengunjung.push({
        question: q.question,
        answer: answer
      });

      // Buka WhatsApp dengan pesan terisi
      notifyWhatsApp(q.question, answer);

      nextButton.hidden = false;
      nextButton.textContent =
        questionIndex === questions.length - 1
          ? "Lihat Kejutan Akhir 🎁"
          : "Pertanyaan Berikutnya ♡";
    });

    answersElement.appendChild(button);
  });
}

// Tombol lanjut
if (nextButton) {
  nextButton.addEventListener("click", () => {
    if (quizFinished) return;

    questionIndex++;

    if (questionIndex < questions.length) {
      renderQuestion();
    } else {
      quizFinished = true;

      if (questionElement) {
        questionElement.textContent =
          "Terima kasih sudah bermain! 💗🌸";
      }

      if (answersElement) {
        answersElement.innerHTML =
          "<p>Semoga kejutan kecil ini membuatmu bahagia 💌</p>";
      }

      nextButton.hidden = true;
    }
  });
}

// Mulai kuis
renderQuestion();
const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

if (bgMusic && musicButton) {
  bgMusic.volume = 1;

  musicButton.addEventListener("click", async () => {
    try {
      if (bgMusic.paused) {
        await bgMusic.play();
        musicButton.textContent = "⏸️ Jeda Musik";
      } else {
        bgMusic.pause();
        musicButton.textContent = "🎵 Putar Musik";
      }
    } catch (error) {
      console.error("Gagal memutar musik:", error);
      alert("Musik gagal diputar. Periksa lokasi dan format file lagu.mp3.");
    }
  });
}