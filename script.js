const qrInput = document.getElementById("qr-input");
const qrContainer = document.getElementById("qr-container");
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");
const qrColor = document.getElementById("qr-color");
const themeToggle = document.getElementById("theme-toggle");
const lastQRBtn = document.getElementById("lastqr-btn");
const newQRBtn = document.getElementById("newqr-btn");
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

/* ---------- Load Last QR ---------- */
lastQRBtn.addEventListener("click", () => {
  const lastQR = localStorage.getItem("lastQR");
  if (lastQR) {
    qrInput.value = lastQR;
    generateBtn.click();
  } else {
    alert("No saved QR found!");
  }
});

/* ---------- New QR ---------- */
newQRBtn.addEventListener("click", () => {
  qrInput.value = "";
  qrContainer.innerHTML = "";
  downloadBtn.disabled = true;
});

/* ---------- Theme Toggle ---------- */
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
  localStorage.setItem("theme", themeToggle.checked ? "dark" : "light");
});

/* ---------- Load Saved Theme ---------- */
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }

  const lastQR = localStorage.getItem("lastQR");
  if (lastQR) {
    qrInput.value = lastQR;
    generateBtn.click();
  }
});
