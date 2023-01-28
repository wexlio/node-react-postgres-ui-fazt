const jwt = require("jsonwebtoken");
const pool = require("../db");

const verifyToken = async (req, res, next) => {
  const result = await pool.query("select * from users");

  console.log(result.rows.length, 99999);

  if (result.rows.length <= 0) {
    next();
    return res.status(201);
  } else {
    const token = req.header("auth-token");

    if (!token) {
      return res.status(401).json({ error: "Acceso denegado" });
    }
    try {
      const verificar = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verificar;
      next();
    } catch (error) {
      res.status(401).json({ error: "token no valido" });
    }
  }
};

const validateAdmin = async (req, res, next) => {
  try {
    console.log(req.user);

    const result = await pool.query("select * from users");

    console.log(result.rows.length, 99999);

    if (result.rows.length <= 0) {
      next();
      return;
    }

    const { id } = req.user;

    const responseUsers = await pool.query(
      "select u.id, u.name, u.correo, r.role from users u inner join roles r on u.role = r.role WHERE id = $1",
      [id]
    );

    // console.log(responseUsers.rows[0].role);

    if (responseUsers.rows[0].role === "admin") {
      next();
      return;
    } else if (
      responseUsers.rows[0].role === undefined ||
      responseUsers.rows[0].role === null ||
      responseUsers.rows[0].role === "user"
    ) {
      res.status(401).json({ message: "Este usuario no tienes roles" });
    } else {
      res.status(201).json({ message: "Require role adminitrator" });
    }
  } catch (error) {
    console.error("ocurrion algo inesperado");
  }
};

module.exports = {
  verifyToken,
  validateAdmin,
};
