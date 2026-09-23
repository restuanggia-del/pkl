// Navbar Responsive: Toggle Menu & Close Menu Otomatis

// Ambil elemen tombol hamburger dan menu navbar
const navbarToggle = document.getElementById("navbarToggle");
const navbarMenu = document.getElementById("navbarMenu");

// Saat tombol hamburger diklik:
// - toggle class "active" di tombol (biar animasi jadi tanda X)
// - toggle class "active" di menu (biar menu muncul/hilang)
navbarToggle.addEventListener("click", () => {
  navbarToggle.classList.toggle("active");
  navbarMenu.classList.toggle("active");
});

// Ambil semua link yang ada di dalam menu navbar
const navbarLinks = document.querySelectorAll(".navbar-link");

// Supaya saat salah satu menu di-klik (khusus di layar kecil),
// menu otomatis tertutup lagi
navbarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbarToggle.classList.remove("active");
    navbarMenu.classList.remove("active");
  });
});

// 2. FOOTER: TAHUN OTOMATIS

// Supaya tulisan "hak cipta" di footer selalu menampilkan
// tahun sekarang tanpa perlu diubah manual tiap tahun
const tahunSekarang = document.getElementById("tahunSekarang");
if (tahunSekarang) {
  tahunSekarang.textContent = new Date().getFullYear();
}

// =======================================
// Materi selanjutnya:
// Interaksi untuk Hero, Tentang, Portfolio,
// Blog, dan CTA akan ditambahkan di sini.
// =======================================
