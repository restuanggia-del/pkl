const elAngka = document.getElementById("layar-angka");
const elRumus = document.getElementById("layar-rumus");

// Mengubah "1234567.5" menjadi "1.234.567,5" (format Indonesia)
function formatAngka(teks) {
  teks = String(teks);
  const negatif = teks.startsWith("-");
  if (negatif) teks = teks.slice(1);

  const [bulat, desimal] = teks.split(".");
  const denganTitik = bulat.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    (negatif ? "−" : "") +
    denganTitik +
    (desimal === undefined ? "" : "," + desimal)
  );
}

// Kalau angkanya panjang, kecilkan huruf sampai muat di layar
function sesuaikanUkuranFont() {
  elAngka.style.fontSize = "";
  let ukuran = parseFloat(getComputedStyle(elAngka).fontSize);

  while (elAngka.scrollWidth > elAngka.clientWidth && ukuran > 16) {
    ukuran -= 2;
    elAngka.style.fontSize = ukuran + "px";
  }
}

function tampilkan(angka, rumus, operatorAktif, pesanError) {
  elRumus.textContent = rumus;

  if (pesanError) {
    elAngka.textContent = pesanError;
    elAngka.classList.add("error");
  } else {
    elAngka.textContent = formatAngka(angka);
    elAngka.classList.remove("error");
    sesuaikanUkuranFont();
  }

  // Sorot tombol operator yang sedang aktif
  document.querySelectorAll(".tombol-op").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol.dataset.nilai === operatorAktif);
  });
}

// Font web butuh waktu untuk dimuat, jadi ukur ulang setelah siap
document.fonts.ready.then(sesuaikanUkuranFont);
