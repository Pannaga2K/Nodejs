const exp = require("express");
const app = exp();
const bp = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const pl = require("passport-local");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const User = require("./models/user");
const SeedDB = require("./seeds");

const animeRoutes = require("./routes/anime");
const commentsRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/anime_v2", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

// SeedDB();
app.set("view engine", "ejs");
app.use(require("express-session")({
	secret: "OTAKU",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());

app.use(exp.static("assets"));

app.use(methodOverride("_method"));
app.locals.moment = require("moment");

//AUTH CONFIG
app.use(bp.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

//----------------------------------------------
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	// console.log(res.locals);
	// console.log(req.user);
	next();
});
//----------------------------------------------

app.use("/anime", animeRoutes);
app.use("/anime/:id/comments/", commentsRoutes);
app.use(indexRoutes);

passport.use(new pl(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3000, () => {
	console.log("SERVER HAS STARTED");
});
