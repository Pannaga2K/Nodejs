const Anime = require("../models/anime");
const Comment = require("../models/comment");
const middlewareObj = {
	checkAnimeOwnerShip: function(req, res, next){
		if(req.isAuthenticated()){
			Anime.findById(req.params.id, function(err, anime){
				if(err){
					req.flsh("error", "SOMETHING WENT WRONG!")
					console.log(err);
					res.redirect("back");
				} else {
					if(anime.author.id.equals(req.user._id))
						next();
					else{
						req.flash("error", "YOU DO NOT HAVE PERMISSION");
						res.redirect("back");
					}
				}
			});
		} else{
			req.flash("error", "YOU DO NOT HAVE PERMISSION");
			res.redirect("back");
		}
	},
	checkOwnerShip: function(req, res, next){
		console.log(req.params);
		if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, comment){
				if(err){
					req.flash("error", "SOMETHING WENT WRONG!");
					console.log(err);
					res.redirect("back");
				} else {
					// console.log(comment.author.id);
					console.log(req.user);
					if(comment.author.id.equals(req.user._id))
						next();
					else{
						req.flash("error", "YOU DO NOT HAVE PERMISSION");
						res.redirect("back");
					}
				}
			});
		} 
		else{
			req.flash("error", "YOU DO NOT HAVE PERMISSION");
			res.redirect("back");
		}
	},
	isLoggedIn: function(req, res, next){
		if((req.isAuthenticated())){
			return next();
		}
		req.flash("error", "PLEASE LOGIN FIRST");
		res.redirect("/login");
	}
};

module.exports = middlewareObj;