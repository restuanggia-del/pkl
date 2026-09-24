const simbol = {
  tambah: "+",
  kurang: "−",
  kali: "×",
  bagi: "÷",
};

function bulatkan(angka) {
  return Number(angka.toPrecision(12));
}

function hitung(a, operator, b) {
  if (operator === "tambah") return bulatkan(a + b);
  if (operator === "kurang") return bulatkan(a - b);
  if (operator === "kali") return bulatkan(a * b);
  if (operator === "bagi") return b === 0 ? null : bulatkan(a / b);
}
