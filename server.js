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

const readFilePdf = () => {
	try {
		const filePath = path.join(__dirname, 'public', 'pdf.json');
		const data = fs.readFileSync(filePath);
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}
}

app.get("/Values", (req, res) => {
	const id = req.query.Purchid;
	console.log(`Parametro id: ${id}`);
	const pdf = req.query.pdf;
	console.log(`Parametro pdf: ${pdf}`);
	const encabezadoData = readFile();
	const ocFiltrada = encabezadoData.find(item => item.encabezado.ordenCompra === id);
	console.log(ocFiltrada);
	let response = ocFiltrada;
	if (!ocFiltrada) {
		response = null;
	} else {
		if (pdf === "true") {
			const pdfData = readFilePdf();
			response.pdf = pdfData;
		}
	}
	res.json(response);
});

// app.get("/oc/:id", (req, res) => {
// 	const data = readFile();
// 	const id = req.params.id;
// 	res.json(data);
// });

// export the app for vercel serverless functions
module.exports = app;