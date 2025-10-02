const mongoose = require("mongoose"); //biblioteca do mongodb

const connectToDb = function () {
  mongoose
    .connect(
      "mongodb+srv://giordana:admin@to-do-list.u4fof.mongodb.net/?retryWrites=true&w=majority&appName=to-do-list", //string copiada do mongodb, admin é a senha
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } //parâmetros que evitam um erro de conexão com o mongodb atlas
    )
    .then(() => {
      console.log("MongoDb Atlas CONECTADO!");
    })
    .catch((err) => {
      //o erro vem do próprio express
      console.log(err);
    });
};

module.exports = connectToDb;
