const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static('public'));

const readFile = () => {
	try {
		const filePath = path.join(__dirname, 'public', 'db.json');
		const data = fs.readFileSync(filePath);
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}
}

app.listen(3000, () => {
	console.log("Escuchando");
})

app.get("/oc", (req, res) => {
	const data = readFile();
	res.json(data);
});

app.get("/oc/:id", (req, res) => {
	const data = readFile();
	const id = req.params.id;
	res.json(data);
});

// export the app for vercel serverless functions
module.exports = app;