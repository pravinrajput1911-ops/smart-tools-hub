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
// ===== Calculator =====

let display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}
// ===== Image Compressor =====

let compressedBlob = null;

document.getElementById("quality").addEventListener("input", function () {
    document.getElementById("qualityValue").innerText = this.value + "%";
});

function compressImage() {

    const file = document.getElementById("imageInput").files[0];

    if (!file) {
        alert("Please select an image.");
        return;
    }

    const quality =
        document.getElementById("quality").value / 100;

    const reader = new FileReader();

    reader.onload = function (e) {

        const img = new Image();

        img.onload = function () {

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function (blob) {

                compressedBlob = blob;

                const url = URL.createObjectURL(blob);

                document.getElementById("preview").src = url;
                document.getElementById("preview").style.display = "block";

                const download =
                    document.getElementById("downloadBtn");

                download.href = url;
                download.download = "compressed-image.jpg";
                download.style.display = "inline";

            }, "image/jpeg", quality);

        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}
function downloadImage() {
    if (!compressedBlob) {
        alert("Please compress image first!");
        return;
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedBlob);
    link.download = "compressed-image.jpg";
    link.click();
}
// ===== PDF Merge Tool =====

async function mergePDFs() {
    const files = document.getElementById("pdfFiles").files;

    if (files.length < 2) {
        alert("Please select at least 2 PDF files.");
        return;
    }

    const mergedPdf = await PDFLib.PDFDocument.create();

    for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(bytes);

        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

        pages.forEach(page => {
            mergedPdf.addPage(page);
        });
    }

    const mergedBytes = await mergedPdf.save();

    const blob = new Blob([mergedBytes], {
        type: "application/pdf"
    });

    const url = URL.createObjectURL(blob);

    const download = document.getElementById("downloadMergedPDF");

    download.href = url;
    download.download = "Merged-PDF.pdf";
    download.style.display = "inline-block";
}
