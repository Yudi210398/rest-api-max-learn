import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    produksId: {
      type: Schema.Types.ObjectId,
      ref: "Produk",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
