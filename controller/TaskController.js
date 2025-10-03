//controla os métodos da aplicação; a rota fica separada

const Task = require("../models/Task");

const getAllTasks = async function (req, res) {
  try {
    //pega a lista de tarefas que será renderizada no index
    const tasksList = await Task.find(); //pega os dados (lista de tarefas) no db
    return res.render("index", { tasksList, task: null, taskDelete:null }); //passar como json, pois é objeto
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  //é uma função assincrona: uma promessa de que esse código vai executar algum outro código em paralelo e ele(este aqui) vai ter que esperar essa execução acabar para continuar (a continuação é na parte "await").
  const task = req.body; //requisição vinda do elemento body, do index.ejs. task é o objeto que será enviado
  console.log("req.body:", req.body);

  if (!task || !task.task) {
    console.log("Erro: req.body ou propriedade 'task' ausente.");
    return res.redirect("/"); //se não for mandado nada a pagina só é recarregada
  }

  try {
    //tenta cadastrar o objeto no banco de dados
    await Task.create(task); //cria um novo modelo (tarefa) no banco de dados a partir do padrão informado em Task.js
    return res.redirect("/");
  } catch (err) {
    console.error("Erro ao criar tarefa:", err.message);
    res.status(500).send({ error: err.message }); //500 é status de erro no servidor
  }
};

const getById = async (req, res) => { //pega o id de cada task pra diferencia-las se eu quiser apagar/editar
  try {
    const tasksList = await Task.find();

    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id }); //requisita ao cliente, na lista, achar um id igual ao que estou pedindo
      res.render("index", { task, taskDelete: null, tasksList });//responde ao index oq foi encontrado

    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, taskDelete, tasksList });
    }
    
  } catch (err) {
    res.status(500).send({ error: err.message });
  }  
};

const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);//atualiza no banco de dados a task cujo id é igual ao do parametro
    res.redirect("/")
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deleteOneTask = async (req, res) => {
  const id = req.params.id; //id tirado da rota
  try {
    await Task.deleteOne({_id: req.params.id})
    res.redirect("/")
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getById,
  updateOneTask,
  deleteOneTask,
}; //exporta para outros módulos
