const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadImages() {
  loading.style.display = "block";
  errorDiv.innerHTML = "";
  output.innerHTML = "";

  const imagePromises = images.map((img) => downloadImage(img.url));

  Promise.all(imagePromises)
    .then((loadedImages) => {
      loading.style.display = "none";
      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((error) => {
      loading.style.display = "none";
      errorDiv.innerHTML = error;
    });
}

downloadImages();