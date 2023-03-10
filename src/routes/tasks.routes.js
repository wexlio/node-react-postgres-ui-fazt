const { Router } = require("express");
const {
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.controller");
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  login,
} = require("../controllers/users.controller");

const { admin } = require("../controllers/admin");
const { verifyToken, validateAdmin } = require("../controllers/validate.token");

const router = Router();

//Routes de tareas

router.get("/tasks", getAllTask);

router.get("/tasks/:id", getTask);

router.post("/tasks", createTask);

router.delete("/tasks/:id", deleteTask);

router.put("/tasks/:id", updateTask);

//Routes de users

router.get("/users", getAllUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser); // register

router.delete("/users/:id", deleteUser);

router.put("/users/:id", updateUser);

//Routes de login/register

router.post("/login", login);// login

router.get("/login", (req, res) => {
  res.send({msg: "Login"})
});

//Routes de admin o dashboard

router.get("/admin", verifyToken, admin);

module.exports = router;
