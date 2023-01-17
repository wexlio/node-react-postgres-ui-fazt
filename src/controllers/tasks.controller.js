const pool = require("../db");

const getAllTask = async (req, res, next) => {
  try {
    const result = await pool.query("select * from task");

    console.log(result);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }

  //   res.send("Retrienving a list of task1");
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("select * from task where id = $1", [id]);
    console.log(result);
    result.rows.length === 0
      ? res.status(404).json({ mensagge: "task not found" })
      : res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "delete from task where id = $1 RETURNING *",
      [id]
    );
    console.log(result);
    result.rows.length === 0
      ? res.status(404).json({ mensagge: "task not found" })
      : res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    console.log(result.rows);
    result.rows.length === 0
      ? res.status(404).json({ mensagge: "task not found" })
      : res.send(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTask: getAllTask,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
