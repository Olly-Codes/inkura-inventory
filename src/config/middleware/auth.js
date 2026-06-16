exports.redirectIfAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

exports.requireAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "ADMIN") {
        return next();
    }
    res.status(403).render("error", {
        title: "Error 403",
        message: "Access denied. You do not have the required permissions to view this page",
        activePage: ""
    });
}