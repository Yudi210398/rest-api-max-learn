import express from "express";
const routerUSer = express.Router();
import * as controller from "../controller/userController.js";

routerUSer.get("/", controller.getUser);
routerUSer.post("/daftar", controller.userNewPost);
routerUSer.post("/masuk", controller.loginUser);
routerUSer.delete("/:id", controller.deleteUser);

export default routerUSer;
