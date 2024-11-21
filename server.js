const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static('public'));

const readData = () => {
	try {
		const filePath =  path.join(__dirname, '../public/db.json');
		const data = fs.readFileSync(filePath)
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}
}


// A simple get greet method
app.get("/oc", (req, res) => {
    // get the passed query
    //const { numero } = req.query;
    //res.send({ oc: `orden ${numero}!` });
	const data = readData();
	res.json(data);
});

// export the app for vercel serverless functions
module.exports = app;