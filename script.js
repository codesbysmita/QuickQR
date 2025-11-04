const input = document.getElementById("textInput");
const colorPicker = document.getElementById("colorPicker");
const qrCodeContainer = document.getElementById("qrCode");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const toggleMode = document.getElementById("toggleMode");
const body = document.body;

let qr;

function generateQRCode(text, color) {
  qrCodeContainer.innerHTML = "";
  qr = new QRCode(qrCodeContainer, {
    text: text,
    width: 200,
    height: 200,
    colorDark: color,
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

// Generate QR
generateBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return alert("Please enter text or a link.");
  const color = colorPicker.value;
  generateQRCode(text, color);
  downloadBtn.style.display = "block";
  localStorage.setItem("lastQR", JSON.stringify({ text, color }));
});

// Download QR as image
downloadBtn.addEventListener("click", () => {
  const img = qrCodeContainer.querySelector("img") || qrCodeContainer.querySelector("canvas");
  const link = document.createElement("a");
  link.href = img.src;
  link.download = "QuickQR.png";
  link.click();
});

// Dark mode toggle
toggleMode.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleMode.textContent = body.classList.contains("dark") ? "☀️ Light" : "🌙 Dark";
});

// Load last generated QR
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("lastQR"));
  if (saved) {
    input.value = saved.text;
    colorPicker.value = saved.color;
    generateQRCode(saved.text, saved.color);
    downloadBtn.style.display = "block";
  }
});