const express = require("express");
const mongoose = require("mongoose");
const bp = require("body-parser");
const pp = require("passport");
const pl = require("passport-local");
const es = require("express-session");
const User = require("./models/user");
const app = express();

mongoose.connect("mongodb://localhost:27017/auth_demo", {useNewUrlParser:true, useUnifiedTopology: true});


app.use(express.static("styles"));
app.set("view engine", "ejs");
app.use(es({
	secret: "GREED ISLAND",
	resave: false,
	saveUninitialized: false
}));
app.use(pp.initialize());
app.use(pp.session());
app.use(bp.urlencoded({extended: true}));

pp.use(new pl(User.authenticate()));
pp.serializeUser(User.serializeUser());
pp.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	console.log(res.locals);
	next();
});

//HOME ROUTE
app.get("/", (req, res) => {
	res.render("home");
});

//SECRET ROUTE
app.get("/secret", isLoggedIn, function(req, res){
	res.render("secret");
});

//REGISTER FORM ROUTE
app.get("/register", (req, res) => {
	res.render("register");
});

app.post("/register", (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.render("register");
		}
		pp.authenticate("local")(req, res, function(){
			console.log(user);
			res.render("secret");
		});
	});
});

//LOGIN ROUTE
app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", pp.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res){
});

//LOGOUT ROUTE
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/login");
});

function isLoggedIn(req, res, next){
	if((req.isAuthenticated())){
		return next();
	}else
		res.redirect("/login");
}

app.listen(3000, () => {
	console.log("SERVER HAS STARTED");
});
