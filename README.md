
# Envoi d'un mail de confirmation pour la validation de compte User "




## Création du projet

Création d'un backend et d'un frontend

```bash
  npx create-react-app + nom du projet
```

## Création des dossiers frontend et backend

1) je crée un dossier Frontend dans lequel je colle tous les fichiers existants.

2) je crée un dossier Backend
## Création du backend
```bash
  npm init
```
 Cette ligne va importer le fichier "package.json"

 ### Pour la connexion à la base de données suivre les instructions du projet "connexionBddReactNode"






## le frontend


```bash
  npm install react-hook-form react-router-dom yup --save 
```
Ces packages vont nous permettres de gérer les régles dans les formulaires.

```bash
  npm install bcrypt --save 
```
Celui-ci nous permet de crypter notre mot de passe.




### fichier CreatUser.js

Dans ce fichier je vais créer le formulaire d'inscription et pointer vers mon API pour lui passer les données de l'utilisateur.






```javascript

 const [register, handleSubmit] = useCreateUser();
  const [newTruc, setNewTruc] = useState("");
  const showData = async (data) => {
    let value = {
      email: data.email,
      password: data.password,
    };
    accountService
      .createUser(value, {
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((res) => setNewTruc(res.message));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(showData)}>
        <p>{newTruc}</p>
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email")}
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password")}
          required
        />
        <button type="submit">Validez</button>
      </form>
    </div>
  );
};
export default CreateNewUser;

```

## Le backend

```bash
  npm install nodemailer --save 
```
Ce package va nous permettre de créer le composant pour l'envoi de mail


## NodeMailer.js

Création du fichier NodeMailer.js à la racine du projet backend

```javascript 
const nodeMailer = require("nodemailer");
require("dotenv").config();
const Email = process.env.EMAIL;
const password = process.env.PASSWORD;

const transport = nodeMailer.createTransport({
  service: "hotmail",
  auth: {
    user: Email,
    pass: password,
  },
});

module.exports.sendConfirmationEmail = (email, activationCode) => {
  transport
    .sendMail({
      from: "t.thai@outlook.fr",
      to: email,
      subject: "Confirmer votre compte 'Flex'",
      html: `<div>
    <h1>Email de confirmation</h1>
    <h2>Bonjour ${email},</h2>
    <p>Pour validez votre compte, veuillez cliquer sur ce lien</p>
    <a href=http://localhost:3000/emailConfirm/${activationCode}>Cliquez ici!</a></div>`,
    })
    .catch((err) => console.log(err));
};


```
## server.js


```javascript

const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json()).use(morgan("dev")).use(bodyParser.json()).use(cors());
// const sequelize = require("./src/db/sequelize");
//je passe la methode initDb a sequelize
// sequelize.initDb();
const PORT = process.env.PORT || 6000;

require("./src/routes/createUser")(app);
require("./src/routes/emailVerif")(app);

app.listen(PORT, () => console.log(`le port est PORT:${PORT}`));


```
## AccountServices.js

```javascript
import Axios from "../apis/Axios";

const createUser = (data) => {
  return Axios.post("/createUser", data);
};
let emailConfirm = (activateCode) => {
  return Axios.post(`/emailConfirm/${activateCode}`);
};

export const accountService = { createUser, emailConfirm };
```
## activationAccount.js coté frontend


Lorsque je valide le mail que j'ai reçu, celui-ci me renvoi vers ce fichier dans lequel je créer un input de validation et je pointe vers mon API.


```javascript

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ActivationAccount() {
  const { activationCode } = useParams();
  const navigate = useNavigate();

  function handleClick() {
    try {
      axios
        .post(
          `http://localhost:5000/sendMailApi/emailConfirm/${activationCode}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data.message);
          console.log(res.data.data.isActive);
          console.log(res);
          if (res.data.data.isActive) {
            navigate("/Welcome");
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Felicitation !</h1>
      <button onClick={handleClick}>Allons-y!</button>
    </div>
  );
}

export default ActivationAccount;
```
## EmailVerif.js coté backend

```javascript

const { User } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/sendMailApi/emailConfirm/:activationCode", async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          activationCode: req.params.activationCode,
        },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Ce code d'activation est faux" });
      }
      user.isActive = true;
      await user.save();
      res.json({
        message: "Votre compte a été activé avec succès !",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Une erreur est survenue lors de l'activation de votre compte.",
      });
    }
  });
};
```

Dans ce code je passe mon champs "isActive" à true.
Ainsi dans le composant activationCode je vérifie si "isActive"est à true alors je renvoie le composant WelcomPage
qui est la première page de notre site.
