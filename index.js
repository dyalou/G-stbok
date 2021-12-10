const express = require("express");
const app = express();

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
app.get("/meddelande.json", (req, res) => {
  res.send(JSON.stringify(besok));
});
// för att kunna läsa foemen från kroppen i ett post-meddelande från klienten
app.use(express.json());
app.post("/skriv-fran-mall", (req, res) => {
  // skriva till fil från formulär och lägg till ett nytt element som klienten har sckickat

  let newMessage = {
    name: req.body.name.replace(/</g, "&lt;"),
    tel: req.body.tel.replace(/</g, "&lt;"),
    adress: req.body.adress.replace(/</g, "&lt;"),
    email: req.body.email.replace(/</g, "&lt;"),
    meddelande: req.body.meddelande.replace(/</g, "&lt;"),
  };
  //busha ut varje message vi får till de övriga
  besok.push(newMessage);
  fs.writeFileSync("meddelande.json", JSON.stringify(besok, null, 4));
  res.send();
});

app.get("/lista", (req, res) => {
  const besok = JSON.parse(fs.readFileSync("meddelande.json"));
  console.log("before  inner html here");
  fs.writeFileSync("meddelande.json", JSON.stringify(besok, null, 4));
  //skicka till klienten
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
    messagSträng += "_______________________________________";
    messagSträng += "<br>";
  }

  res.send();
});
