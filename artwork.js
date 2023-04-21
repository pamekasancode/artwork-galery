// Deklarasi variabel konstanta yang menyimpan API URL dan elemen HTML
const ARTWORK_API_URL = "https://api.artic.edu/api/v1/artworks?page=1&limit=100";
const artworkContainer = document.querySelector("#artworks-container");

// Fungsi untuk menampilkan kartu karya seni
function renderArtwork(artwork) {
    // Membuat elemen div untuk kartu karya seni
    const artworkCard = document.createElement("div");
    artworkCard.className = "col-md-4 mb-4";

    // Membuat elemen gambar untuk kartu karya seni
    const image = document.createElement("img");
    image.className = "card-img-top img-fluid";
    if (artwork.thumbnail) {
        // Jika terdapat thumbnail, gunakan URL IIIF untuk menampilkan gambar
        image.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
    } else {
        // Jika tidak terdapat thumbnail, gunakan placeholder gambar
        image.src = "https://via.placeholder.com/300x300";
    }
    image.loading = "lazy";
    image.style.maxWidth = "100%";
    image.style.height = "auto";
    artworkCard.appendChild(image);

    // Membuat elemen judul dan artis untuk kartu karya seni
    const title = document.createElement("h5");
    title.className = "mt-2";
    title.textContent = artwork.title;
    artworkCard.appendChild(title);

    const artist = document.createElement("p");
    artist.className = "text-muted";
    artist.textContent = artwork.artist_title;
    artworkCard.appendChild(artist);

    // Menambahkan kartu karya seni ke dalam container
    artworkContainer.appendChild(artworkCard);
}

// Fungsi untuk menampilkan semua karya seni
function renderArtworks(artworks) {
  // Mengosongkan container karya seni
  artworkContainer.innerHTML = "";
  // Menampilkan kartu karya seni untuk setiap data karya seni
  artworks.forEach((artwork) => {
    renderArtwork(artwork);
  });
}

// Fungsi untuk memuat data karya seni dari API
async function loadArtworks() {
  try {
    const response = await fetch(ARTWORK_API_URL);
    const data = await response.json();
    renderArtworks(data.data);
  } catch (error) {
    console.log(error);
  }
}

// Memuat data karya seni ketika halaman dimuat jika container tersedia
if (artworkContainer) {
  loadArtworks();
}
