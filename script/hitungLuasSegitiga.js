function rumusLuasSegitiga(alas, tinggi) {
  return 0.5 * alas * tinggi;
}

document.getElementById("myButton").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  const alas = document.getElementById("alas").value;
  const tinggi = document.getElementById("tinggi").value;

  const luas = rumusLuasSegitiga(alas, tinggi);
  document.getElementById("result").innerText = "Luas Segitiga: " + luas;
  document.getElementById("result").style.display = "block";
  document.getElementById("result").style.color = "blue";
  document.getElementById("result").style.fontSize = "20px";
  document.getElementById("result").style.fontWeight = "bold";
  document.getElementById("result").style.textAlign = "center";
  document.getElementById("result").style.marginTop = "20px";
});
