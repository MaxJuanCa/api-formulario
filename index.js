import express from "express";

const app = express();

app.listen(3000), () => {
	console.log("Escuchando")
}

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});