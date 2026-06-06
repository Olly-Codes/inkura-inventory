const express = require("express");
const path = require("node:path");
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Listening on port ${PORT}`);
});