const express = require("express");
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static('public'));

const allowedOrigins = [
	'https://formulario-beta3.vercel.app',
	'http://localhost:5173', // Otro dominio permitido
];

app.use(cors({
	origin: function (origin, callback) {
		// Permitir solicitudes sin origen (por ejemplo, en herramientas como Postman)
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true); // Solicitud permitida
		} else {
			callback(new Error('No permitido por CORS')); // Bloquear otros orígenes
		}
	},
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