const admin = (req, res) => {
  res.json({
    error: null,
    data: {
      title: "mi ruta protegida",
      user: req.user,
    },
  });
};
module.exports = {
  admin,
};
