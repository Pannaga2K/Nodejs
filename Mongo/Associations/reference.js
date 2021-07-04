// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/embed_ex_2", {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.set("useFindAndModify", false);

const User = require("./models/user");
const Post = require("./models/post");

// User.create({
// 	email: "Tenma@gmail.com",
// 	name: "Kenzo Tenma"
// });

// Post.create({
// 	title: "Monster",
// 	summary: "Monster"
// }, function(err, post){
// 	User.findOne({name: "Kenzo Tenma"}, function(err, user){
// 		if(err)
// 			console.log(err)
// 		else{
// 			user.post.push(post);
// 			user.save(function(err, data){
// 				console.log(data);
// 			});
// 		}
// 	});
// });

User.findOne({name: "Kenzo Tenma"}).populate("post").exec(function(err, user){
	if(err)
		console.log(err);
	else{
		console.log(user);
	}
});



