const mongoose = require("mongoose");
const Anime = require("./models/anime");
const Comment = require("./models/comment");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", {useNewUrlParser: true, useUnifiedTopology: true});

const data = [{
		name: "MONSTER",
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Monster_%28manga_-_promo_image%29.jpg/220px-Monster_%28manga_-_promo_image%29.jpg",
		Number: 74
}, 			{
		name: "NARUTO",
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/NarutoCoverTankobon1.jpg/220px-NarutoCoverTankobon1.jpg",
		Number: 720
}, 			{
		name: "BLEACH",
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Bleachanime.png/220px-Bleachanime.png",
		Number: 366	
}];

function seedDB(){
	Anime.deleteMany({}, function(err){
		if(err)
			console.log(err);
		else{
			console.log("REMOVED ANIME");
			data.forEach(function(seed){
				Anime.create(seed, function(err, anime){
					if(err)
						console.log(err);
					else{
						console.log("ADDED ANIME");
						Comment.create({
							title: "HEY OTAKUS",
							author: "SHINKAI"
						}, function(err, comment){
							if(err)
								console.log(err);
							else{
								anime.comments.push(comment);
								anime.save();
								console.log("CREATED COMMENTS");
							}
						});
						
					}
				});
			});	
		}
	});
}

module.exports = seedDB;