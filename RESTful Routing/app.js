const exp = require("express");
const bp = require("body-parser");
const es = require("express-sanitizer");
const mongoose = require("mongoose");
const mo = require("method-override");
const app = exp();

mongoose.connect("mongodb://localhost:27017/restful_route", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

app.use(exp.static("assets"));
app.use(bp.urlencoded({extended: true}));
app.use(es());
app.use(mo("_method"));
app.set("view engine", "ejs");

const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	episodes: Number,
	character: String,
	updated: {type: Date, default: Date.now}
});
const Anime = mongoose.model("aniblog", blogSchema);

app.get("/", (req, res) => {
	res.send("GO TO /anime PAGE!");
});

// HOME PAGE
app.get("/anime", (req, res) => {
	Anime.find({}, function(err, anime) {
		if(err)
			console.log(err);
		else
			res.render("new", {anime: anime});
	});
});
// NEW AND CREATE
app.post("/anime", (req, res) => {
	req.body.anime.character = req.sanitize(req.body.anime.character)
	Anime.create(req.body.anime, (err, anime) => {
		if(err)
			res.render("new");
		else
			res.redirect("/anime");
	});
});

app.get("/anime/new", (req, res) => {
	res.render("form");
});
// INFO ROUTE
app.get("/anime/:id", (req, res) => {
	Anime.findById(req.params.id, function(err, anime) {
		if(err)
			res.redirect("/anime");
		else
			res.render("show", {anime: anime});
	});
});
//EDIT ROUTE
app.get("/anime/:id/edit", (req, res) => {
	Anime.findById(req.params.id, function(err, anime){
		if(err)
			res.redirect("/anime");
		else
			res.render("edit", {anime: anime});
	});
});

app.put("/anime/:id", (req, res) => {
	Anime.findByIdAndUpdate(req.params.id, req.body.anime, function(err, anime){
		if(err)
			res.redirect("/anime");
		else
			res.redirect("/anime/" + req.params.id);
	});
});
//DELETE ROUTE
app.delete("/anime/:id", (req, res) => {
	Anime.findByIdAndRemove(req.params.id, function(err){
		if(err)
			res.redirect("/anime");
		else
			res.redirect("/anime");
	});
});

app.listen(3000, (req, res) => {
	console.log("SERVER HAS STARTED!");
});

