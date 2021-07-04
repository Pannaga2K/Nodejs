const exp = require('express');
const app = exp();

app.get("/", (req, res) => {
	res.send("WELCOME!");
});

app.get("/:animal", (req, res) => {
	var a = req.params.animal;
	var x;
	if(a == "pig")
		x = "OINK";
	else if(a == "cow")
		x = "MOO";
	else if(a == "dog")
		x = "WOOF! WOOF!";
	res.send("THE " + a.toUpperCase() + " SAYS " + x);
});

app.get("/repeat/:rName/:rNum", (req, res) => {
	var num = req.params.rNum;
	var name = req.params.rName;
	var r="";
	for(var i=0;i<num;i++)
	{
		r+=" " + name;
	}
	res.send(name.toUpperCase() + " IS REPEATED " + num + " TIMES: " + r.toUpperCase());
});

app.get("*", (req, res) => {
	res.send("SORRY THE PAGE IS NOT FOUND... ARE YOU ALIVE?");
});
app.listen(3000, () => {
	console.log("SERVER HAS STARTED!");
});