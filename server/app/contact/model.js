import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    timezone: { type: String },
  },
  { timestamps: true }
);

contactSchema.index({ ipAddress: 1, createdAt: -1 });

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
