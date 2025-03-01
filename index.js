const express = require("express");
const cors = require("cors");
//const fs = require("fs");
const router = require("express").Router();
const bodyParser = require("body-parser");
const app = express();
app.use(
  bodyParser.json({
    limit: "100mb",
  })
);
app.use(express.static("uploads"));
app.use("/projects", express.static("images"));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://192.168.21.53:3002",
      "http://192.168.21.53:3001",
      "http://192.168.21.53:3000",
      "http://192.168.1.7:3010",
      "http://127.0.0.1",
      "http://10.0.2.2:3000",
      "http://10.0.2.2",
      "http://10.0.2.2:3010",
      "http://192.168.1.7:8081",
      "http://192.168.1.7",
      "http://192.168.21.53:85",
    ],
    credentials: true,
  })
);

const adminRouter = require("./routes/admin");
const brandRouter = require("./routes/brand");
const drugRouter = require("./routes/drug");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/orders");
const cityRouter = require("./routes/city");
const tierRouter = require("./routes/tier");
const supplierRouter = require("./routes/supplier");

const categoryRouter = require("./routes/categories");

const errorController = require("./controllers/errors");
app.use("/admin", adminRouter);
app.use("/drugs", drugRouter);
app.use("/brand", brandRouter);
app.use("/user", userRouter);
app.use("/categories", categoryRouter);
app.use("/order", orderRouter);
app.use("/city", cityRouter);
app.use("/tier", tierRouter);
app.use("/supplier", supplierRouter);

app.use(errorController.geterror404);
app.use(errorController.geterror500);

app.listen(3020, () => {
  console.log("running");
});
