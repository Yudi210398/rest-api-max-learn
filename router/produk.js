import express from "express";
const routerProduk = express.Router();
import * as controller from "../controller/controllerProduk.js";

import dataAuth from "../middleware/authJwt.js";

import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const simpanFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}.png`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

routerProduk.get("/", controller.produk);
routerProduk.post(
  "/",
  dataAuth,
  multer({ storage: simpanFile, fileFilter }).single("image"),
  controller.produkPost
);
routerProduk.get("/:produkId", controller.idRute);
routerProduk.put("/:produkId", dataAuth, controller.produkPatch);
routerProduk.delete("/:produkId", dataAuth, controller.produkDelete);

export default routerProduk;
