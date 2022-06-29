import express from "express";
const routerorder = express.Router();
import * as controller from "../controller/controllerOrder.js";

routerorder.get("/", controller.order);
routerorder.post("/", controller.orderPost);
routerorder.get("/:orderId", controller.idRute);
routerorder.put("/:orderId", controller.orderPatch);
routerorder.delete("/:orderId", controller.orderDelete);

export default routerorder;
