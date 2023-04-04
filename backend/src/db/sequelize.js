//j'import sequelize et Datatype de sequelize
const { Sequelize, DataTypes } = require("sequelize");
//j'import le model User
const UserModel = require("../models/userModel");
//je crée une instance de sequelise pour me connecter à ma base de données
//j'instancie le model User et lui passe les methode sequelise et Datatype

//j'import les données en dure
// const users = require("./mock-User");

const sequelize = new Sequelize("nodeSendmail", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});
const User = UserModel(sequelize, DataTypes);

// const initDb = () => {
//   return sequelize.sync({ force: true }).then((_) => {
//     users.map((user) => {
//       User.create({
//         type_of: user.type_of,
//         email: user.email,
//         password: user.password,
//         token: user.token,
//       }).then((user) => console.log(user.toJSON()));
//     });
//     console.log("La base de donnée a bien été initialisée !");
//   });
// };
sequelize
  .authenticate()
  .then((_) =>
    console.log("la connexion  à la base de données a bien été établie.")
  )
  .catch((error) =>
    console.error("Impossible de se connecter à la base de données")
  );

module.exports = {
  // initDb,
  User,
};
