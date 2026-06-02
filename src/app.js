const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter")
const detailsRouter = require("./routes/detailsRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/details", detailsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Listening on port ${PORT}`);
});