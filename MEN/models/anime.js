const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
	name: String,
	synopsis: String,
	rating: Number,
	startDate: String,
	endDate: String,
	popularity: Number,
	status: String,
	ageRating: String,
	posterImage: String,
	coverImage: String,
	episodes: Number,
	youtubeTrailerId: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: String
	},
	createdAt: {type: Date, default: Date.now},
	comments: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
	}]
});

module.exports = mongoose.model("animeList", animeSchema);