const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/embed_ex_2", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useFindAndModify", false);

const userSchema = new mongoose.Schema({
	email: String,
	name: String
});

module.exports = mongoose.model("User", userSchema)