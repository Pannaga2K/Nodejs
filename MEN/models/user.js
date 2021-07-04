const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	createdAt: {type: Date, default: Date.now},
});

UserSchema.plugin(plm);

module.exports = mongoose.model("User", UserSchema);