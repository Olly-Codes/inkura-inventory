const db = require("../config/db/queries");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const validateRegistration = [
    body("username").trim()
        .notEmpty().withMessage("Username is required")
        .isAlphanumeric().withMessage("Username must only contain letters and numbers")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters"),
    body("email").trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email")
        .normalizeEmail(),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .isStrongPassword({ minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("Password must at least contain one uppercase letter, number and symbol"),
    body("password2").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    })
];

exports.registerGet = async (req, res, next) => {
    try {
        res.render("auth/register", { title: "Register", activePage: "" });
    } catch (err) {
        next(err);
    }
}

exports.loginGet = async (req, res, next) => {
    try {
        res.render("auth/login", { title: "Login", activePage: "" });
    } catch (err) {
        next(err);
    }
}

exports.dashboardGet = async (req, res, next) => {
    try {
        const [totalManga, totalCategories, totalAuthors] = await Promise.all([
            db.getTotalManga(),
            db.getTotalCategories(),
            db.getTotalAuthors()
        ]);
        res.render("auth/dashboard", {
            title: "Dashboard", 
            activePage: "dashboard",
            stats: [
                { label: "Total manga", value: totalManga },
                { label: "Categories", value: totalCategories },
                { label: "Authors", value: totalAuthors }
            ]
        });
    } catch (err) {
        next(err);
    }
}

exports.registerPost = [
    validateRegistration,
    async (req, res, next) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).render("auth/register", {
                title: "Register",
                activePage: "",
                errors: validationErrors.array()
            });
        } else {
            try {
                const { username, email, password, password2 } = req.body;
                const user = await db.getUserByEmail(email)

                if (user) {
                    res.render("auth/register", {
                        title: "Register",
                        activePage: "",
                        errors: [{
                            msg: "Email already registered"
                        }]
                    });
                    return;
                } else {
                    const hashedPass = await bcrypt.hash(password, 10);
                    await db.insertUser(username, email, hashedPass);
                    req.flash("success_msg", "You have registred successfully. Please log in");
                    res.redirect("/auth/login");
                }
            } catch (err) {
                next(err)
            }
        }
    }
];

exports.logoutGet = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success_msg", "You have logged out successfully");
        res.redirect("/auth/login");
    });
}

exports.loginPost = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true
});