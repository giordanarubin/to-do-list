//aqui ficam as rotas, e não no programa principal

const routes = require("express").Router();
const taskController = require("../controller/TaskController");

//cada ação do CRUD é uma ROTA dentro do projeto
routes.get("/", taskController.getAllTasks);
routes.post("/create", taskController.createTask);
routes.get("/getById/:id/:method", taskController.getById);
routes.post("/updateOne/:id", taskController.updateOneTask);
routes.get("/deleteOne/:id/", taskController.deleteOneTask);

module.exports = routes;
