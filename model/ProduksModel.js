import mongoose from "mongoose";

const Schema = mongoose.Schema;

const produkSchema = new Schema(
  {
    namaProduk: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Produk", produkSchema);
