import orderModel from "../model/orderModel.js";
import ProduksModel from "../model/ProduksModel.js";
import { funsiCari } from "../controller/controllerProduk.js";
const sortirId = (produks, produksId) => {
  const hasil = produks.filter((data) => data._id.toString() === produksId);

  if (hasil.length < 1) {
    const error = new Error("Data id Salah, cek lagi");
    error.statusCode = 404;
    throw error;
  }
  return hasil;
};
export const order = async (req, res, next) => {
  try {
    const dataModel = await orderModel.find().populate("produksId");
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
    const quantity = +req.body.quantity;
    const produksId = req.body.produksId;
    const produks = await ProduksModel.find();
    const hasil = sortirId(produks, produksId);

    const order = await new orderModel({
      quantity: quantity,
      produksId: produksId,
    }).save();

    res.status(200).json({
      pesan: "sukses post",
      order,
      dataOrder: hasil,
    });
  } catch (err) {
    next(err);
  }
};

export const idRute = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const getOrder = await orderModel.find().populate("produksId");
    const filter = funsiCari(getOrder, id);

    if (filter.length < 1) {
      const error = new Error("tidal ada data yang dicari");
      error.statusCode = 406;
      throw error;
    }

    let detailProduk = filter[0];
    res.status(200).json({
      detailProduk,
      pesan: "berhasi dapat data",
    });
  } catch (err) {
    next(err);
  }
};

export const orderPut = async (req, res, next) => {
  try {
    const produksId = req.body.produksId;
    const quantity = req.body.quantity;
    const id = req.params.orderId;
    const produks = await ProduksModel.find();
    const order = await orderModel.findById(id);
    if (produksId) sortirId(produks, produksId);
    order.quantity = !quantity ? order.quantity : quantity;

    order.produksId = !produksId ? order.produksId : produksId;

    await order.save();
    await order.populate("produksId");
    res.status(200).json({
      pesan: "sukses update order",
      order,
    });
  } catch (err) {
    next(err);
  }
};

export const orderDelete = async (req, res, next) => {
  try {
    const id = req.params.orderId;

    const deleteProduk = await orderModel.findByIdAndRemove(id);

    res.status(200).json({
      pesan: "sukses delete order",
      deleteProduk,
    });
  } catch (err) {
    console.log(err);
  }
};
