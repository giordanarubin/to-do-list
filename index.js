//imports do jeito "antigo" de fazer do node
const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const connectToDb = require("./database/db");

const app = express();
const port = 3000;

connectToDb();//executando função da pasta database

app.use(express.json());//serve para o servidor conseguir receber o que vier de um formulario
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); //para usar o ejs
app.use(express.static(path.join(__dirname, "public"))); //exporta o caminho dos arquivos estáticos: html, css
app.use(routes);

/* Em vez de fazer do jeito abaixo, eu separo o método no controller, exporto para routes para usar lá e aqui só faço app.use; para modularizar e manter a organização
 */
// app.get("/home", (req, res) => {
//   res.render("index");
// });

//colocar ponto e virgula automatico: alt shift f

app.listen(port, () => console.log(`Listening on port ${port}`));
//função com 1 só linha não precisa de chaves
