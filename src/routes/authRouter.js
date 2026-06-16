const { Router } = require("express");
const { redirectIfAuth, requireAdmin } = require("../config/middleware/auth");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/register", redirectIfAuth, authController.registerGet);
authRouter.get("/login", redirectIfAuth, authController.loginGet);
authRouter.get("/dashboard", requireAdmin, authController.dashboardGet);
authRouter.get("/logout", authController.logoutGet);

authRouter.post("/register", authController.registerPost);
authRouter.post("/login", authController.loginPost);

module.exports = authRouter