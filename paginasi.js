// Membuat variabel untuk menampung elemen HTML dari tombol load-more dan loading spinner
const paginationBtn = document.querySelector("#load-more-btn");
const loadingSpinner = document.querySelector("#loading-spinner");

// Menetapkan konstanta PAGE_LIMIT dan variabel currentPage dan isFetching untuk memuat karya seni
const PAGE_LIMIT = 100;
let currentPage = 1;
let isFetching = false;

// Fungsi async untuk memuat karya seni dan merendernya
async function loadArtworks() {
  try {
    // Memuat data karya seni dengan menggunakan fetch API
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${PAGE_LIMIT}`);
    const data = await response.json();
    // Merender karya seni yang telah dimuat
    renderArtworks(data.data);
    // Mengembalikan nilai false untuk isFetching setelah data karya seni telah dimuat
    isFetching = false;
  } catch (error) {
    console.log(error);
  }
}

// Fungsi async untuk memuat lebih banyak karya seni saat tombol load-more ditekan
async function loadMoreArtworks() {
  // Menetapkan nilai true untuk isFetching saat memuat lebih banyak karya seni
  if (isFetching) return;
  isFetching = true;

  try {
    // Menambah nilai currentPage dengan 1 setiap kali tombol load-more ditekan
    currentPage++;
    // Memuat data karya seni baru dengan menggunakan fetch API
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${PAGE_LIMIT}`);
    const data = await response.json();
    // Merender karya seni yang baru dimuat
    renderArtworks(data.data);
  } catch (error) {
    console.log(error);
  } finally {
    // Mengembalikan nilai false untuk isFetching setelah data karya seni baru telah dimuat
    isFetching = false;
  }
}

// Fungsi untuk mendeteksi saat user melakukan scroll pada halaman
function handleScroll() {
  // Mendapatkan nilai scrollTop, scrollHeight, dan clientHeight dari elemen HTML dokumen
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // Memeriksa apakah user telah menggulir hampir mencapai bagian bawah halaman
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // Menampilkan loading spinner dan memuat lebih banyak karya seni saat user menggulir hampir mencapai bagian bawah halaman
    loadingSpinner.classList.remove("d-none");
    loadMoreArtworks();
  }
}

// Menambahkan event listener untuk mendeteksi saat tombol load-more ditekan
paginationBtn.addEventListener("click", loadMoreArtworks);

// Menambahkan event listener untuk mendeteksi saat user melakukan scroll pada halaman
window.addEventListener("scroll", handleScroll);
