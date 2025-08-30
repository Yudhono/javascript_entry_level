function ganjilAtauGenap(angka) {
  return (sisaHasilBagi = angka % 2);
}

document
  .getElementById("buttonCek")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const angka = parseInt(document.getElementById("angka").value);
    const hasil = ganjilAtauGenap(angka);

    if (hasil > 0) {
      document.getElementById(
        "resultSIM"
      ).innerText = `${angka} adalah bilangan ganjil`;
    } else {
      document.getElementById(
        "resultSIM"
      ).innerText = `${angka} adalah bilangan genap`;
    }
    document.getElementById("resultSIM").style.display = "block";
  });
