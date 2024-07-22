import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  reportID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "report",
    required: true,
  },

  paid: {
    type: Boolean,
    default: false,
  },
});

export const PaymentModel = mongoose.model("payment", paymentSchema);
