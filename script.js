const qrInput = document.getElementById("qr-input");
const qrContainer = document.getElementById("qr-container");
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");
const qrColor = document.getElementById("qr-color");
const themeToggle = document.getElementById("theme-toggle");
let qr;

/* ---------- QR Generation ---------- */
generateBtn.addEventListener("click", () => {
  const text = qrInput.value.trim();
  if (!text) {
    alert("Please enter text or a URL!");
    return;
  }

  qrContainer.innerHTML = "";
  qr = new QRCode(qrContainer, {
    text: text,
    width: 200,
    height: 200,
    colorDark: qrColor.value,
    colorLight: "#ffffff",
  });

  setTimeout(() => {
    downloadBtn.disabled = false;
    localStorage.setItem("lastQR", text);
  }, 500);
});

/* ---------- Download ---------- */
downloadBtn.addEventListener("click", () => {
  const img = qrContainer.querySelector("img");
  if (img) {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "QuickQR.png";
    link.click();
  }
});

/* ---------- Auto Load Last QR ---------- */
window.addEventListener("load", () => {
  const lastQR = localStorage.getItem("lastQR");
  if (lastQR) {
    qrInput.value = lastQR;
    generateBtn.click();
  }
});

/* ---------- Theme Toggle ---------- */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});