const exp = require("express");
const app = exp();
const bp = require("body-parser");
let a = ["NARUTO", "BLEACH", "HUNTERXHUNTER", "KUROKO NO BASKET", "HAIKYUU", "MOB PSYCHO 100", 					"SAMURAI CHAMPLOO"];

app.use(bp.urlencoded({extended:true}));
app.use(exp.static("assets"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.send("GO TO /anime PAGE!");
});

// TO ADD ANIME TO THE LIST
app.post("/addanime", (req, res) => {
	var nA = req.body.newAnime;
	a.push(nA);
	res.redirect("/anime");
});

app.get("/anime", (req, res) => {
	res.render("new", {anyme:a});
});

app.listen(3000, () => {
	console.log("SERVER HAS STARTED!");
});