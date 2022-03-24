require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to db"));

app.use(express.json());

const humanRouter = require("./routes/humans");

app.use("/humans", humanRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
