const pool = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res, next) => {
  try {
    const result = await pool.query("select * from users");

    console.log(result.rows);
    console.log(result.rows.length, 99999);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }

  //   res.send("Retrienving a list of task1");
};

const getUser = async (req, res, next) => {
  try {
    console.log(req.params, 999);
    const { id } = req.params;
    const result = await pool.query("select * from users where id = $1", [id]);
    console.log(result);
    result.rows.length === 0
      ? res.status(404).json({ mensagge: "user not found" })
      : res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, correo, password } = req.body;

    const resultUsers = await pool.query("select * from users");

    if (resultUsers.rows.length <= 0) {
      req.body.role = 'admin'
    } else if (resultUsers.rows.length > 0 && (req.body.role === null || req.body.role === undefined)) {
      req.body.role = 'user'
    }

    const salt = await bcryptjs.genSalt(10);
    const pass = await bcryptjs.hash(password, salt);

    const result = await pool.query(
      "INSERT INTO users (name, correo, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, correo, pass, req.body.role]
    );

    console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "delete from users where id = $1 RETURNING *",
      [id]
    );
    console.log(result);
    result.rows.length === 0
      ? res.status(404).json({ mensagge: "user not found" })
      : res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, correo, password, role } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const pass = await bcryptjs.hash(password, salt);

    const result = await pool.query(
      "UPDATE users SET name = $1, correo = $2, password = $3, role = $4 WHERE id = $5 RETURNING *",
      [name, correo, pass, role, id]
    );
    console.log(result.rows);
    result.rows.length === 0
      ? res.status(404).json({ mensagge: "user not found" })
      : res.send(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  console.log(req.body);

  const { correo, password } = req.body;

  const response = await pool.query("select * from users where correo = $1", [correo]);

  const validatedPass = await bcryptjs.compare(password, response.rows[0].password)

  const token = jwt.sign({
    name: response.rows[0].name,
    id: response.rows[0].id
  }, process.env.TOKEN_SECRET)


  !validatedPass
      ? res.status(404).json({ mensagge: "Clave invalida" })
      : res.header('auth-token', token).status(201).json({ mensagge: "Bienvenido", error: null, data: {token} })

};

const register = async () => {};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  login,
  register,
};
