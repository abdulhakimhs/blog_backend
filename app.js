const express = require("express");
const morgan = require("morgan");
require("express-async-errors");
require("./db");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const config = require("./config");
const { errorHandler } = require("./middlewares/error");
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/blog", postRouter, commentRouter);

app.use("/*", handleNotFound);

app.use(errorHandler);

app.get("/about", (req, res) => {
  res.send("<h1>Hello I am from you backend about</h1>");
});

app.listen(config.port, () => {
  console.log(`the port is listening on ${config.port}`);
});
