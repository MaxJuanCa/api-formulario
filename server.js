const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();

// A simple get greet method
app.get("/oc", (req, res) => {
    // get the passed query
    //const { numero } = req.query;
    //res.send({ oc: `orden ${numero}!` });

	const filePath = path.join(__dirname, '../public/db.json');
	fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send('Error al leer el archivo');
        }
        res.send(`Contenido del archivo: ${data}`);
    });
});

// export the app for vercel serverless functions
module.exports = app;