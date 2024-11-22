const express = require("express");
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static('public'));

// Configurar CORS
app.use(cors({
	origin: 'http://localhost:5173', // Origen permitido
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
	allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

app.listen(3000, () => {
	console.log("Escuchando");
});

const readFile = () => {
	try {
		const filePath = path.join(__dirname, 'public', 'db.json');
		const data = fs.readFileSync(filePath);
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}
}

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