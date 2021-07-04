const exp = require("express");
const router = exp.Router();
const Anime = require("../models/anime");
const User = require("../models/user");
const passport = require("passport");
const middleware = require("../middleware");

//INITIAL ROUTE
router.get("/", (req, res) => {
	res.render("init", {currentUser: req.user});
});

//AUTH ROUTES
router.get("/register", function(req, res){
	res.render("register", {currentUser: req.user});
});

router.post("/register", function(req, res){
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash("error", err.message);
			return res.render("register", {currentUser: req.user});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "WELCOME TO AN-I/ME! " + user.username);
			res.redirect("/anime");
		});
	});
});

//LOGIN ROUTES
router.get("/login", (req, res) => {
	res.render("login", {currentUser: req.user});
});

router.post("/login", passport.authenticate("local", {successRedirect: "/anime",failureRedirect: "/login"}), function(req, res){});

router.get("/login/forgotPw", (req, res) => {
	res.render("resetPw", {currentUser: req.user});
});

router.post("/login/forgotPw", (req, res) => {
	const u = {username: req.body.username};
	User.findOne(u, function(err, user){
		if(err)
			console.log(err);
		else{
			console.log(req.body.password);
			if(req.body.password === req.body.confirm_password){
				user.setPassword(req.body.password, function(err, data){
					if(err){
						console.log(err);
						res.redirect("/login");
					} else{
						console.log(data);
						data.save((err, acc) => {
							if(err) console.log(err);
							else console.log(acc);
						});
						req.flash("success", "PASSWORD IS SET SUCCESSFULLY");
						res.redirect("/login");
					}
				});
			}
			else{
				req.flash("error", "PASSWORD DOES NOT MATCH!");
				res.redirect("/login");
			}
		}
	});
});

//LOGOUT ROUTES
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "LOGGED YOU OUT");
	res.redirect("/anime");
});

router.get("/profile", (req, res) => {
	let animeArr=[], count=0, noAnime = "YET TO ADD ANIME";
	Anime.find({}, function(err, anime){
		if(err){
			console.log(err);
			res.redirect("/anime");
		} else {
			console.log(anime);
			anime.forEach(data => {
				if(String(data.author.id) == String(req.user._id)){					// data.author.id.equals(req.user._id)
					console.log(data);
					animeArr.push(data);
					count++;
				}
			});
			if(!count)
				res.render("profile", {message: noAnime});
			else {
				Array.from(new Set(animeArr));
				res.render("profile", {currentUser: req.user, anime: animeArr, message: 0});
			}
				
		}
	});
});

router.get("/profile/changePassword", (req, res) => {
	res.render("changePassword");
});

router.post("/profile/changePassword", (req, res) => {
	User.findById(req.user._id, function(err, user){
		if(err){
			console.log(err);
			res.redirect("/anime");
		} else {
			if(req.body.nPword === req.body.cPword){
				user.changePassword(req.body.oPword, req.body.nPword, function(err, data){
					if(err){
						console.log(err);
						res.redirect("/anime");
					}
					else {
						console.log(data);
						req.flash("success", "SUCCESSFULLY CHANGED PASSWORD");
						res.redirect("/profile");
					}
				});
			}
			else {
				req.flash("error", "PASSWORD DOES NOT MATCH");
				res.redirect("/profile/changePassword");
			}
		}
	});
});

module.exports = router;