const db = require("../config/db/queries");
const { body, validationResult, matchedData } = require("express-validator");

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
        res.render("auth/dashboard", { title: "Dashboard", activePage: "" });
    } catch (err) {
        next(err);
    }
}