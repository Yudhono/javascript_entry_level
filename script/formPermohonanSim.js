function hitungUmur(tanggalLahir) {
  const today = new Date();
  const birthDate = new Date(tanggalLahir);

  let umur = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  // jika bulan saat ini kurang dari bulan lahir, atau bulan sama tapi hari saat ini kurang dari hari lahir
  // maka umur berkurang 1 tahun
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    umur--;
  }
  return umur;
}

document
  .getElementById("myButtonSIM")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    const nama = document.getElementById("nama").value;
    const alamat = document.getElementById("alamat").value;
    const tanggalLahir = document.getElementById("tanggalLahir").value;

    // hitung umur
    const umur = hitungUmur(tanggalLahir);
    if (umur < 17) {
      alert("Anda belum cukup umur untuk mendapatkan SIM.");
      return;
    }

    // tampilkan hasil
    document.getElementById("resultSIM").innerHTML =
      "Nama: " +
      nama +
      "<br>Alamat: " +
      alamat +
      "<br>Umur: " +
      umur +
      " tahun<br>Anda layak mendapatkan SIM.";
    document.getElementById("resultSIM").style.display = "block";
    document.getElementById("resultSIM").style.color = "green";
    document.getElementById("resultSIM").style.fontSize = "20px";
    document.getElementById("resultSIM").style.fontWeight = "bold";
    document.getElementById("resultSIM").style.textAlign = "center";
    document.getElementById("resultSIM").style.marginTop = "20px";
  });
