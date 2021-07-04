const exp = require("express");
const request = require("request");
const router = exp.Router({mergeParams: true});
const Anime = require("../models/anime");
const User = require("../models/user");
const passport = require("passport");
const middleware = require("../middleware");

//INDEX ROUTE
router.get("/", (req, res) => {
	Anime.find({}, function(err, anime){
		if(err)
			console.log(err);
		else{
			res.render("anime/new", {anime:anime, currentUser: req.user});
		}
	});
});

//NEW ROUTE
router.get("/add", middleware.isLoggedIn, (req, res) => {
	res.render("anime/forms", {currentUser: req.user});
});

//CREATE ROUTE
router.post("/", (req, res) => {	
	const a1 = req.body.name;
	const author = {
		id: req.user._id,
		username: req.user.username
	};
	request("https://kitsu.io/api/edge/anime?filter[text]=" + a1.toLowerCase(), (error, response, body) => {
		const parser = JSON.parse(body);
		const nA = {
					name:a1,
					synopsis: parser.data[0].attributes.synopsis,
					rating: parser.data[0].attributes.averageRating,
					startDate: parser.data[0].attributes.startDate,
					endDate: parser.data[0].attributes.endDate,
					popularity: parser.data[0].attributes.popularityRank,
					status: parser.data[0].attributes.status,
					ageRating: parser.data[0].attributes.ageRating,
					posterImage: parser.data[0].attributes.posterImage.original,
					coverImage: parser.data[0].attributes.coverImage.original,
					episodes: parser.data[0].attributes.episodeCount,
					youtubeTrailerId: parser.data[0].attributes.youtubeVideoId,
					author: author,
				};
		Anime.create(nA, function(err, anime) {
			if(err)
				console.log(err);
			else{
				res.redirect("/anime");
			}
		});
	});
});

//SHOW ROUTE
router.get("/:id", (req, res) => {
	Anime.findById(req.params.id).populate("comments").exec(function(err, foundAnime){
		if(err)
			console.log(err);
		else{
			res.render("anime/show", {anime: foundAnime, currentUser: req.user});
		}
	});	
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkAnimeOwnerShip,  (req, res) => {
	Anime.findById(req.params.id, function(err, anime){
		res.render("anime/edit", {anime: anime});
	});
});

//UPDATE ROUTE
router.put("/:id", middleware.checkAnimeOwnerShip, (req, res) => {
	Anime.findByIdAndUpdate(req.params.id, req.body.anime, function(err, data){
		if(err){
			console.log(err);
			res.redirect("/anime");
		}
		else{
			console.log(data.episodes);
			res.redirect("/anime/" + req.params.id);
		}
	});
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkAnimeOwnerShip, (req, res) => {
	Anime.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/anime");
		}
		else
			res.redirect("/anime");
	});
});

module.exports = router;