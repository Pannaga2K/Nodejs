const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/embed_ex_2", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useFindAndModify", false);

const postSchema = new mongoose.Schema({
	title: String,
	summary: String
});

module.exports = mongoose.model("Post", postSchema);