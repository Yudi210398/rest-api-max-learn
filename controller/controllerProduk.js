import ProduksModel from "../model/ProduksModel.js";

export const produk = async (req, res, next) => {
  try {
    const data = await ProduksModel.find().select(
      "_id namaProduk harga createdAt updatedAt"
    );
    if (!data)
      res.status(400).json({
        pesan: "data tidak ada get",
        data,
      });
    const dataSet = {
      jumlahData: data.length,
      data,
    };
    res.status(200).json({
      pesan: "sukses get",
      dataSet,
    });
  } catch (err) {
    console.log(err);
  }
};

export const produkPost = async (req, res, next) => {
  try {
    const produks = await new ProduksModel({
      namaProduk: req.body.nama,
      harga: +req.body.harga,
    }).save();
    res.status(201).json({
      pesan: "sukses post",
      produks,
    });
  } catch (err) {
    console.log(err);
  }
};

export const idRute = async (req, res, next) => {
  try {
    const id = req.params.produkId;
    const getProduk = await ProduksModel.find();
    const filter = getProduk.filter((data) => data._id.toString() === id);

    if (filter.length < 1) {
      const error = new Error("tidal ada data yang dicari");
      error.statusCode = 406;
      throw error;
    }

    let dataTemu = filter[0];

    res.status(200).json({
      dataTemu,
      pesan: "berhasi dapat data",
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

export const produkPatch = async (req, res, next) => {
  try {
    const id = req.params.produkId;
    const dataUpdate = await ProduksModel.findById(id);

    dataUpdate.namaProduk = !req.body.nama
      ? dataUpdate.namaProduk
      : req.body.nama;
    dataUpdate.harga = !req.body.harga ? dataUpdate.harga : req.body.harga;
    await dataUpdate.save();

    res.status(200).json({
      pesan: "sukses update",
      dataUpdate,
    });
  } catch (err) {
    console.log(err);
  }
};

export const produkDelete = async (req, res, next) => {
  try {
    const id = req.params.produkId;

    const deleteProduk = await ProduksModel.findByIdAndRemove(id);
    res.status(200).json({
      pesan: "sukses delete",
      deleteProduk,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
  }
};
