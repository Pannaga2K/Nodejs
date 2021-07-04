const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/anime");

const animeScheme = new m.Schema({
	Name: String,
	Episodes: Number,
	Protagonsit: String
});

const anime = m.model("Anime", animeScheme);

// METHOD 1
const newAnime = new anime({
	Name: "Bleach",
	Episodes: 366,
	Protagonist: "Kurosaki Ichgo"
});

newAnime.save((err, anime) => {
	if(err)
		console.log("SOMETHING IS WRONG");
	else
	{
		console.log("ANIME:")
		console.log(anime);
	}
});

// METHOD 2
anime.create({
	Name: "Naruto",
	Episodes: 720,
	Protagonist : "Naruto"
}, (err, anime) => {
	if(err)
		console.log("SOMETHING WENT WRONG!");
	else
		console.log("ANIME: " + anime);
});

// FETCH anime INFO
anime.find({}, (err, anime) => {
	if(err)
		console.log(err);
	else
		console.log("ANIME:" + anime);
});