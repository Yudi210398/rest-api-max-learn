import jwt from "jsonwebtoken";
import { errors } from "../controller/userController.js";

const data = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token, `token`);
    const decode = jwt.verify(token, `rahasia`);
    req.userData = decode;
    console.log(req.userData);
    next();
  } catch (err) {
    return res.status(400).json({ pesan: "auth failed, anda belum login" });
  }
};

export default data;
