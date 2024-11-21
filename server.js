const express = require("express");
const fs = require('fs');
const app = express();

const readData = () => {
	const data = fs.readFileSync("./db.json");
	console.log(data);
}

readData();

// A simple get greet method
app.get("/oc", (req, res) => {
    // get the passed query
    const { numero } = req.query;
    res.send({ oc: `orden ${numero}!` });
});

// export the app for vercel serverless functions
module.exports = app;