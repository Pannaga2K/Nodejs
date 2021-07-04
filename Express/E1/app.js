const express = require('express');
const app = express();

// ROOT
app.get("/", (req, res) => {
	res.send("BLEACH");
});

app.get("/bleach", (req, res) => {
	res.send("KUROSAKI ICHIGO");
});

app.get("/anime/:animeName/:numOfEpisodes", (req, res) => {
	var name = req.params.animeName;
	var nOE = req.params.numOfEpisodes;
	res.send(name.toUpperCase() + " HAS THESE MANY EPISODES: " + nOE);
});

// ANY OTHER GIVER ROUTE ON URL
app.get("*", (req, res) => {
	res.send("AIZEN SOUSUKE");
});

// SERVER STARTS AT PORT 3000
app.listen(process.env.PORT || 3000,process.env.IP, () => {
	console.log("SERVER HAS STARTED");
});