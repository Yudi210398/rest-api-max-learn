import express from "express";
const routerProduk = express.Router();
import * as controller from "../controller/controllerProduk.js";

routerProduk.get("/", controller.produk);
routerProduk.post("/", controller.produkPost);
routerProduk.get("/:produkId", controller.idRute);
routerProduk.put("/:produkId", controller.produkPatch);
routerProduk.delete("/:produkId", controller.produkDelete);

export default routerProduk;
