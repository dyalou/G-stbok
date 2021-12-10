let hamtaData = function () {
  let forfragan = new XMLHttpRequest(); // skapa ett nytt XMLHttpRequest
  forfragan.open("GET", "/meddelande.json"); // hämta en route som implementeras på servern
  forfragan.onload = function () {
    // funktion som anropas när vi fått resultatet från servern
    console.log("Mottog svar från servern!");
    console.log(this.response); // textsträng som hämtats från server
    const messagSträng = JSON.parse(this.response);
    // gör om textsträng till JavaScript-objekt
    document.getElementById("output").innerHTML = " "; //tom the div
    console.log(messagSträng);
    for (let i = 0; i < messagSträng.length; i++) {
      // för vart och ett av objekten i fältet
      for (attribut in messagSträng[i]) {
        document.getElementById("output").innerHTML +=
          messagSträng[i][attribut] + " " + "<br>";
      }
      document.getElementById("output").innerHTML += "<br>";
    }
  };
  forfragan.send(); // skicka förfrågan
};
window.onload = function () {
  // hämta data från servern och skriv ut
  document.getElementById("mittFormular").addEventListener("submit", (e) => {
    e.preventDefault();
    let forfragan = new XMLHttpRequest(); // skapa ett nytt XMLHttpRequest
    forfragan.open("POST", "/skriv-fran-mall"); // hämta en route som implementeras på servern
    forfragan.onload = function () {
      hamtaData();
      document.getElementById("nameInput").value = ""; // tomma flätet
      document.getElementById("telInput").value = "";
      document.getElementById("adressInput").value = "";
      document.getElementById("email").value = "";
      document.getElementById("meddelande").value = "";
    };
    forfragan.setRequestHeader("content-type", "application/json"); //läsa från json filen
    forfragan.send(
      JSON.stringify({
        name: document.getElementById("nameInput").value,
        tel: document.getElementById("telInput").value,
        adress: document.getElementById("adressInput").value,
        email: document.getElementById("email").value,
        meddelande: document.getElementById("meddelande").value,
      })
    );
  });
  hamtaData();
};
