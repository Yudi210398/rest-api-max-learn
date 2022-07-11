import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const errors = (pesan, code = 404) => {
  const error = new Error(pesan);
  error.statusCode = code;
  throw error;
};

export const getUser = async (req, res, next) => {
  try {
    const dataUser = await userModel.find();
    if (dataUser.length === 0) errors("Tidak ada Ada user");

    res.status(201).json({
      jumlahData: dataUser.length,
      dataUser,
      pesan: "sukses get data",
    });
  } catch (err) {
    next(err);
  }
};

export const userNewPost = async (req, res, next) => {
  try {
    const duplicatEmail = await userModel.findOne({ email: req.body.email });

    if (duplicatEmail) errors(`email ${req.body.email} sudah digunakan`);

    await bcrypt.hash(req.body.password, 10, async (err, hash) => {
      try {
        if (err) errors("Tidak bisa encrype password");
        else {
          const userNew = await new userModel({
            email: req.body.email,
            password: hash,
          });
          const data = await userNew.save();

          res.status(201).json({
            data,
            pesan: `sukses buat user baru`,
          });
        }
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const cekEmail = await userModel.findOne({ email: req.body.email });
    if (!cekEmail) errors("email yang anda masukan tidak ada");

    bcrypt.compare(req.body.password, cekEmail.password, (err, result) => {
      try {
        if (err) errors("Auth Failed");
        if (result) {
          const token = jwt.sign(
            {
              email: cekEmail.email,
              id: cekEmail._id,
            },
            "rahasia",
            {
              expiresIn: "120000",
            }
          );
          return res.status(201).json({
            pesan: `Sukses login`,
            result,
            hasil: cekEmail,
            token,
          });
        }
        errors("password salah");
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteProduk = await userModel.findByIdAndRemove(id);
    res.status(200).json({
      pesan: `sukses delete ${deleteProduk.email}`,
      deleteProduk,
    });
  } catch (err) {
    next(err);
  }
};
