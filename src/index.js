const express = require("express");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./router/index");
const bodyParser = require("body-parser");
const app = express();
const { User, role } = require("./models/index");
const db = require("./models/index");

// const UserRepository = require("./repository/user-repository");
const UserService = require("./services/user-service");
const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, () => {
    console.log(`server Started at port ${PORT}`);
  });
  // const user = await User.findByPk(3);
  // const Role = await role.findByPk(3);
  // user.addRole(Role);
  // console.log(Role);
  // const res = await Role.getUsers();
  // console.log(res);
  // console.log(await user.hasRole(Role));
  // db.sequelize.sync({ alert: true });
  //   const repo = new UserRepository();
  //   const user = await repo.getById(3);
  //   console.log(user);
};

prepareAndStartServer();
