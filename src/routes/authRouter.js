const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/register", authController.registerGet);
authRouter.get("/login", authController.loginGet);
authRouter.get("/dashboard", authController.dashboardGet);

authRouter.get("/logout", authController.logoutGet);

authRouter.post("/register", authController.registerPost);
authRouter.post("/login", authController.loginPost);

module.exports = authRouter