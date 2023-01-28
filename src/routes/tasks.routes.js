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

router.post("/tasks", [verifyToken, validateAdmin], createTask);

router.delete("/tasks/:id", [verifyToken, validateAdmin], deleteTask);

router.put("/tasks/:id", [verifyToken, validateAdmin], updateTask);

//Routes de users

router.get("/users", getAllUsers);

router.get("/users/:id", getUser);

router.post("/users", [verifyToken, validateAdmin], createUser); // register

router.delete("/users/:id", [verifyToken, validateAdmin], deleteUser);

router.put("/users/:id", [verifyToken, validateAdmin], updateUser);

//Routes de login/register

router.post("/login", login);

//Routes de admin o dashboard

router.get("/admin", verifyToken, admin);

module.exports = router;
