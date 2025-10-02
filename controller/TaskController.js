//controla os métodos da aplicação; a rota fica separada

const Task = require("../models/Task");

const getAllTasks = async function (req, res) {
  try {
    //pega a lista de tarefas que será renderizada no index
    const tasksList = await Task.find(); //pega os dados no db
    return res.render("index", { tasksList, task: null }); //passar como json, pois é objeto
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
    await Task.create(task); //cria um novo modelo no banco de dados a partir do padrão informado em Task.js
    return res.redirect("/");
  } catch (err) {
    console.error("Erro ao criar tarefa:", err.message);
    res.status(500).send({ error: err.message }); //500 é status de erro no servidor
  }
};

const getById = async (req, res) => { //pega o id de cada task pra diferencia-las se eu quiser apagar/editar
  try {
    const task = await Task.findOne({_id: req.params.id}); //vai na lista, acha um id igual ao que estou pedindo
    const tasksList = await Task.find();
    res.render("index", { task, tasksList });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }  
};

module.exports = {
  getAllTasks,
  createTask,
  getById,
}; //exporta para outros módulos
