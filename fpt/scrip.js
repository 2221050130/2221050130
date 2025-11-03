let danhSachPhim = [
  {
    id: 1,
    tenPhim: "Mưa đỏ",
    namPhatHanh: 2025,
    tuoi: 16,
    thoiLuong: 125,
    quocGia: "Việt Nam",
    poster: "/fpt/img/350x495-muado.jpg",
  },
  {
    id: 1,
    tenPhim: "Conan",
    namPhatHanh: 2025,
    tuoi: 16,
    thoiLuong: 125,
    quocGia: "Việt Nam",
    poster: "/fpt/img/350x495-muado.jpg",
  },
];

// Lấy phần tử banner từ HTML
let banner = document.querySelector(".slider");

// Hàm chọn phim (cập nhật hình nền banner)
function chonPhim(idPhim) {
  const phim = danhSachPhim.find((p) => p.id === idPhim);
  if (phim && banner) {
    banner.style.backgroundImage = `url('${phim.poster}')`;
    document.querySelector(".tieu-de-phim").textContent = phim.tenPhim;
    document.querySelector(
      ".thong-tin-phim"
    ).textContent = `${phim.namPhatHanh} · ${phim.thoiLuong}p · ${phim.quocGia}`;
  }
}
