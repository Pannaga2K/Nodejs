const exp = require("express");
const app = exp();

app.use(exp.static("assets"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.send("PLEASE ENTER ANIME AND A CHARACTER SEPERATED WITH A / IN THE URL!");
});

app.get("/:anime/:char", (req, res) => {
	let a = req.params.anime.toUpperCase();
	let c = req.params.char.toUpperCase();
	res.render("new",{Anyme:a, Character:c});
});

app.listen(3000, () => {
	console.log("SERVER HAS STARTED!");
});