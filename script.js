// Welcome Message
console.log("🚀 Smart Tools Hub Loaded");

// Explore Button
const btn = document.querySelector("button");

if (btn) {
  btn.addEventListener("click", function () {
    alert("🚀 Welcome to Smart Tools Hub!\nMore powerful tools are coming soon.");
  });
}
// ===== Password Generator =====

function generatePassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";

  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  document.getElementById("password").value = password;
}

function copyPassword() {
  const password = document.getElementById("password");

  password.select();
  password.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(password.value);

  alert("✅ Password Copied!");
  }
 // ===== QR Code Generator =====

function generateQR() {
    const text = document.getElementById("qrText").value;

    if (text === "") {
        alert("Please enter text or URL");
        return;
    }

    document.getElementById("qrcode").innerHTML = "";

    const qrBox = document.getElementById("qrcode");

qrBox.innerHTML = "";

const qrcode = new QRCode(qrBox, {
    text: text,
    width: 200,
    height: 200
});
}
function downloadQR() {
    const img = document.querySelector("#qrcode img");
    const canvas = document.querySelector("#qrcode canvas");

    let url;

    if (img) {
        url = img.src;
    } else if (canvas) {
        url = canvas.toDataURL("image/png");
    } else {
        alert("Please generate a QR Code first!");
        return;
    }

    const a = document.createElement("a");
    a.href = url;
    a.download = "QRCode.png";
    a.click();
}
