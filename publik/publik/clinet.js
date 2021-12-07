alert("HEJ");
let hamtaData = function () {
  let forfragan = new XMLHttpRequest(); // skapa ett nytt XMLHttpRequest
  forfragan.open("GET", "/meddelande.json"); // hämta en route som implementeras på servern
  forfragan.onload = function () {
    // funktion som anropas när vi fått resultatet från servern
    console.log("Mottog svar från servern!");
    console.log(this.response); // textsträng som hämtats från server
    data = JSON.parse(this.response); // gör om textsträng till JavaScript-objekt (i detta fall ett fält med två objekt)
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      // för vart och ett av objekten i fältet
      for (attribut in data[i]) {
        document.getElementById("output").innerHTML += data[i][attribut] + " ";
      }
      document.getElementById("output").innerHTML += "<br>";
    }
  };
  forfragan.send(); // skicka förfrågan
};
window.onload = function () {
  // hämta data från servern och skriv ut
  hamtaData();
};
