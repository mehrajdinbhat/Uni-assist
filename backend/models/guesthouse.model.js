import mongoose from "mongoose";

const guestHouseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    purpose: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },

    documents: [
      {
        public_id: String,
        url: String,
        fileType: String,
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Institute Verified", "Registrar Approved", "Rejected"],
      default: "Pending",
    },
    instituteRemarks: String,
    registrarRemarks: String,
    permissionLetter: { type: String }, // Cloudinary PDF link
  },
  { timestamps: true }
);

export default mongoose.model("GuestHouseRequest", guestHouseSchema);
