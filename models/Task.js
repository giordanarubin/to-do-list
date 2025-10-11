//modelo de documento da coleção (as tarefas)

const mongoose = require("mongoose");

//schema é uma coleção no mongdb. da mesma forma q em um bd relacional a coleção é uma tabela
const taskSchema = new mongoose.Schema({ //estrutura de cada tarefa
  task: {
    type: String,
    require: true, //significa q é obrigatório
  },
  check: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(), //pega a data atual do servidor que estiver rodando o projeto
  },
});//definição dos dados que o post terá

module.exports = mongoose.model("Task", taskSchema);//export diferente, "Task" é o apelido que será usado para se referir a essa função taskSchema em outras partes do projeto
