// ES6
import { connect, set, Schema, model } from "mongoose";
connect("mongodb://localhost:27017/embed_ex", {useNewUrlParser: true, useUnifiedTopology: true});
set("useFindAndModify", false);

// ES5
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/embed_ex", {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.set("useFindAndModify", false);

//POST
const postSchema = new Schema({
	title: String,
	summary: String
});

const Post = model("Post", postSchema);

//USER
const userSchema = new Schema({
	email: String,
	name: String,
	post: [postSchema]
});

const User = model("User", userSchema);

// var newUser = new User();

// newUser.save(function(err, user){
// 	if(err)
// 		console.log(err);
// 	else{
// 		console.log(user);
// 	}
// });
User.findOne({name: "HADES"}, function(err, user){
	if(err)
		console.log(err);
	else{
		user.post.push({
			title: "HADES KERBECS",
			summary: "STAMINA AND ATTACK TYPE"
		});	
		user.save(function(err, user){
		if(err)
			console.log(err);
		else
			console.log(user);
		});
	}
});