const MAKS_DIGIT = 12;

// ---------- Keadaan kalkulator ----------
let angkaLayar = "0"; // angka yang sedang tampil (disimpan sebagai teks)
let angkaPertama = null; // angka sebelum operator, misal 5 pada "5 + 3"
let operatorAktif = null; // "tambah" | "kurang" | "kali" | "bagi"
let mulaiAngkaBaru = false; // true = angka berikutnya menggantikan yang di layar
let rumusSelesai = ""; // teks kecil setelah tekan "=", misal "6 × 9 ="
let pesanError = null;

// Menyalin keadaan ke layar
function perbaruiLayar() {
  let rumus = rumusSelesai;
  if (operatorAktif) {
    rumus = formatAngka(angkaPertama) + " " + simbol[operatorAktif];
  }

  // Sorot operator hanya saat kalkulator menunggu angka kedua
  const disorot = mulaiAngkaBaru ? operatorAktif : null;
  tampilkan(angkaLayar, rumus, disorot, pesanError);
}

// ---------- Aksi tombol ----------
function tekanAngka(digit) {
  if (mulaiAngkaBaru || angkaLayar === "0") {
    angkaLayar = digit;
  } else if (angkaLayar.replace(/[-.]/g, "").length < MAKS_DIGIT) {
    angkaLayar += digit;
  }
  mulaiAngkaBaru = false;
  rumusSelesai = "";
  perbaruiLayar();
}

function tekanKoma() {
  if (mulaiAngkaBaru) {
    angkaLayar = "0.";
    mulaiAngkaBaru = false;
  } else if (!angkaLayar.includes(".")) {
    angkaLayar += ".";
  }
  rumusSelesai = "";
  perbaruiLayar();
}

function tekanOperator(operator) {
  // Kalau angka kedua sudah diketik, hitung dulu (2 + 3 × ... => 5 × ...)
  if (operatorAktif && !mulaiAngkaBaru) {
    const hasil = hitung(angkaPertama, operatorAktif, parseFloat(angkaLayar));
    if (hasil === null) return tampilkanError("Tidak bisa dibagi nol");
    angkaLayar = String(hasil);
  }

  angkaPertama = parseFloat(angkaLayar);
  operatorAktif = operator;
  mulaiAngkaBaru = true;
  perbaruiLayar();
}

function tekanSamaDengan() {
  if (!operatorAktif) return;

  const angkaKedua = parseFloat(angkaLayar);
  const hasil = hitung(angkaPertama, operatorAktif, angkaKedua);
  if (hasil === null) return tampilkanError("Tidak bisa dibagi nol");

  rumusSelesai =
    formatAngka(angkaPertama) +
    " " +
    simbol[operatorAktif] +
    " " +
    formatAngka(angkaKedua) +
    " =";

  angkaLayar = String(hasil);
  angkaPertama = null;
  operatorAktif = null;
  mulaiAngkaBaru = true;
  perbaruiLayar();
}

function tekanPersen() {
  angkaLayar = String(bulatkan(parseFloat(angkaLayar) / 100));
  mulaiAngkaBaru = false;
  perbaruiLayar();
}

function ubahTanda() {
  if (angkaLayar !== "0") {
    angkaLayar = angkaLayar.startsWith("-")
      ? angkaLayar.slice(1)
      : "-" + angkaLayar;
  }
  perbaruiLayar();
}

function hapusSatu() {
  if (mulaiAngkaBaru) return; // jangan hapus hasil perhitungan

  angkaLayar = angkaLayar.slice(0, -1);
  if (angkaLayar === "" || angkaLayar === "-") angkaLayar = "0";
  perbaruiLayar();
}

function hapusSemua() {
  angkaLayar = "0";
  angkaPertama = null;
  operatorAktif = null;
  mulaiAngkaBaru = false;
  rumusSelesai = "";
  pesanError = null;
  perbaruiLayar();
}

function tampilkanError(pesan) {
  hapusSemua();
  pesanError = pesan;
  perbaruiLayar();
}
