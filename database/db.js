const mongoose = require("mongoose"); //biblioteca do mongodb

require("dotenv").config();

const connectToDb = function () {
  mongoose
    .connect(
      process.env.DATABASE_URI
      /* {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } //parâmetros que evitam um erro de conexão com o mongodb atlas */
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
