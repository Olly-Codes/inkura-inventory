const express = require("express");
const path = require("node:path");
require("dotenv").config();
const indexRouter = require("./routes/indexRouter")
const detailsRouter = require("./routes/detailsRouter");
const categoryRouter = require("./routes/categoryRouter");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/details", detailsRouter);
app.use("/categories", categoryRouter);

app.use((req, res, next) => {
    const err = new Error("The page you are looking for does not exist");
    err.statusCode = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const errorMessage = statusCode === 500
    ? "Something went wrong on our end!" : err.message;

    if (process.env.NODE_ENV !== "production") {
        console.error(err.stack);
    }

    res.status(statusCode).render("error", {
        title: `Error ${statusCode}`,
        message: errorMessage
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Listening on port ${PORT}`);
});