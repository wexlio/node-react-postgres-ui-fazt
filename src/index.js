const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const tasksRoutes = require("./routes/tasks.routes");

const app = express();
require('.lib/passport')

app.use(session({
  secret: 'sessionfazt',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())

app.use(tasksRoutes);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next()
// })

//variables locales
app.use((req, res, next) => {
  app.locals.success = req.flash('success') 
  next()
})

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(4000);
console.log("server on port 4000");
