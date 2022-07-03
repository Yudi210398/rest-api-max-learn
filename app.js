import express from "express";
import path from "path";
import routerProduk from "./router/produk.js";
import routerorder from "./router/orderRute.js";
import morgan from "morgan";
import routerError from "./router/errorRoute.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import routerUSer from "./router/userRouter.js";

const app = express();

const __dirname = path.resolve();
console.log("/images", path.join(__dirname, "gambar"));
const port = 8000;
(async () => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  app.use("/images", express.static("images"));

  app.use("/produks", routerProduk);
  app.use("/orders", routerorder);
  app.use("/users", routerUSer);
  app.use(routerError);

  app.use((error, req, res, next) => {
    let pesan;
    let status;
    console.log(error.message, error.statusCode);
    if (error.statusCode === 500) {
      status = error.statusCode;
      pesan = "Server Bermasalah";
      return res
        .status(status)
        .json({ error: { pesan: `${pesan + " " + status}` } });
    }
    status = error.statusCode;
    pesan = error.message;
    res.status(status).json({ error: { pesan: `${pesan + " " + status}` } });
  });

  await mongoose.connect(
    "mongodb+srv://runatyudi:kawasanrokok1998@cluster0.oaqmd.mongodb.net/restApiYt?retryWrites=true&w=majority"
  );

  app.listen(port, () => console.log(`konek`));
})();
