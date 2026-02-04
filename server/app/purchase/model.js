import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    courseSlug: { type: String, required: true, trim: true },
    courseTitle: { type: String, required: true, trim: true },
    coursePrice: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'cancelled'], 
      default: 'completed' 
    },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

purchaseSchema.index({ email: 1, createdAt: -1 });
purchaseSchema.index({ courseSlug: 1 });

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;
