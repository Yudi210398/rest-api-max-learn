import orderModel from "../model/orderModel.js";

export const order = async (req, res, next) => {
  try {
    const dataModel = await orderModel.find();
    const dataSet = {
      jumlahData: dataModel.length,
      dataModel,
    };
    res.status(200).json({
      pesan: "sukses get order",
      dataSet,
    });
  } catch (err) {
    console.log(err);
  }
};

export const orderPost = async (req, res, next) => {
  try {
    // const order = {
    //   idProduk: Math.random(),
    //   quantity: +req.body.quantity,
    // };

    const order = await new orderModel({
      quantity: +req.body.quantity,
      produksId: req.body.produksId,
    }).save();

    res.status(200).json({
      pesan: "sukses post",
      order,
    });
  } catch (err) {
    console.log(err);
  }
};

export const idRute = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    if (id === "spesial") {
      res.status(200).json({
        pesan: "sukses dan id anda spesial order",
        id,
      });
    } else {
      res.status(200).json({
        pesan: "sukses get id rute order",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const orderPatch = async (req, res, next) => {
  try {
    res.status(200).json({
      pesan: "sukses Patch order",
    });
  } catch (err) {
    console.log(err);
  }
};

export const orderDelete = async (req, res, next) => {
  try {
    res.status(200).json({
      pesan: "sukses delete order",
    });
  } catch (err) {
    console.log(err);
  }
};
