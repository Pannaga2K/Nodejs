const exp = require("express");
const app = exp();
const request = require("request");

app.use(exp.static("assets"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("search");
});

app.get("/movies", (req, res) => {
	const i = req.query.s;
	let url = "http://www.omdbapi.com/?apikey=a7642e7c&s=" + i;
	request(url, function(error, req, body){
		const parser = JSON.parse(body);
		res.render("results", {data:parser});
	});
});

app.listen(3000, function(){
	console.log("SERVER HAS STARTED!");
});