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
