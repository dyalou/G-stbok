const express = require("express");
const app = express();
const XMLHttpRequest = require("xhr2");
const xhr = new XMLHttpRequest();

//starta serven på localhost 3000
app.listen(3000);
console.log("kör på localhost:3000");
// oppen globalmapp för att servern ska kunna hitta filer som klientsidesskript,
app.use("/publik", express.static("publik"));
let fs = require("fs"); // filhantering
const { response } = require("express");
const { parse } = require("path/posix");
const besok = JSON.parse(fs.readFileSync("meddelande.json"));
console.log(besok);
//serva en statisk HTML-sida
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

// en express.urlendecoded for post
app.use(express.urlencoded({ extended: true }));
app.post("/skriv-fran-mall", (req, res) => {
  // skriva till fil från formulär

  let newMessage = {
    name: req.body.nameInput,
    tel: req.body.telInput,
    adress: req.body.adressInput,
    email: req.body.email,
    meddelande: req.body.meddelande,
  };

  besok.push(newMessage);
  fs.writeFileSync("meddelande.json", JSON.stringify(besok, null, 4));

  res.redirect("/lista");
});
app.get("/lista", (req, res) => {
  const besok = JSON.parse(fs.readFileSync("meddelande.json"));
  console.log("before  inner html here");
  fs.writeFileSync("meddelande.json", JSON.stringify(besok, null, 4));

  let messagSträng = "";
  for (i in besok) {
    messagSträng += "<br>";
    messagSträng += "name:" + besok[i].name;
    messagSträng += "<br>";
    messagSträng += "tel: " + besok[i].family;
    messagSträng += "<br>";
    messagSträng += "adress: " + besok[i].phoneInput;
    messagSträng += "<br>";
    messagSträng += "email: " + besok[i].email;
    messagSträng += "<br>";
    messagSträng += "Meddelande: " + besok[i].meddelande;
    messagSträng += "<br>";
    messagSträng += "----------------------------------------";
    messagSträng += "<br>";
  }

  res.send(messagSträng);
});
