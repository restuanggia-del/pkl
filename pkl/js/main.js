const daftarAksi = {
  angka: tekanAngka,
  koma: tekanKoma,
  operator: tekanOperator,
  samaDengan: tekanSamaDengan,
  persen: tekanPersen,
  ubahTanda: ubahTanda,
  hapusSatu: hapusSatu,
  hapusSemua: hapusSemua,
};

// ---------- Klik mouse / sentuh ----------
document.querySelector(".tombol-grid").addEventListener("click", (e) => {
  const tombol = e.target.closest(".tombol");
  if (!tombol) return;

  if (pesanError) hapusSemua(); // setelah error, mulai dari awal

  const jalankan = daftarAksi[tombol.dataset.aksi];
  jalankan(tombol.dataset.nilai);
});

// ---------- Keyboard ----------
// Beberapa tombol keyboard punya "kembaran"
const kembaran = { x: "*", "=": "Enter", ".": ",", Delete: "Escape" };

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return; // biarkan Ctrl+C, dll.

  const key = kembaran[e.key] || e.key;
  const semuaTombol = document.querySelectorAll("[data-key]");
  const tombol = [...semuaTombol].find((t) => t.dataset.key === key);
  if (!tombol) return;

  e.preventDefault(); // cegah "/" membuka pencarian & Enter menekan dua kali
  tombol.click();

  // Efek tertekan singkat
  tombol.classList.add("ditekan");
  setTimeout(() => tombol.classList.remove("ditekan"), 100);
});
