const exp = require("express");
const router = exp.Router({mergeParams: true});
const Anime = require("../models/anime");
const Comment = require("../models/comment");
const middleware = require("../middleware/index");

// NEW COMMENT
router.get("/new", middleware.isLoggedIn,  (req, res) => {
	Anime.findById(req.params.id, function(err, anime){
		if(err)
			console.log(err);
		else
			res.render("comments/new", {anime: anime, currentUser: req.user});
	});
});

//CREATE COMMENT
router.post("/", middleware.isLoggedIn, (req, res) => {
	const nTitle = req.body.comments.title;
	const nAuthor = req.body.comments.author;
	const nComment = {title: nTitle, author: nAuthor};
	Anime.findByIdAndUpdate(req.params.id, req.body.comments, function(err, anime){
		if(err)
			console.log(err);
		else{
			Comment.create(nComment, function(err, data){
				if(err)
					console.log(err);
				else{
					data.author.id = req.user._id;
					data.author.username = req.user.username;
					data.save();
					anime.comments.push(data);
					anime.save();
					res.redirect("/anime");
				}
			});
		}
	});
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkOwnerShip, (req, res) => {
	Comment.findById(req.params.comment_id, function(err, data){
		res.render("comments/edit", {comment: data, aid: req.params.id});
	});
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkOwnerShip, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, function(err, upC){
		if(err){
			console.log(err);
			res.redirect("back");
		}
		else
			res.redirect("/anime/" + req.params.id);
	});
});

//DELETE ROUTE
router.delete("/:comment_id", middleware.checkOwnerShip, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err);
			res.redirect("back");
		}
		else {
			res.redirect("/anime/" + req.params.id);
		}
	});
});

module.exports = router;