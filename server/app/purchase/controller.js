import Purchase from "./model.js";
import { purchaseSchema } from "./validator.js";


export const submitPurchase = async (req, res) => {
  try {
    const parsed = purchaseSchema.safeParse(req.body);

    if (!parsed.success) {
      const validationErrors =
        parsed.error?.issues?.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })) || [];

      return res.status(400).json({
        success: false,
        message: validationErrors[0]?.message || "Please provide valid data",
        errors: validationErrors,
      });
    }

    const purchase = new Purchase({
      ...parsed.data,
      ipAddress: req.ip || req.connection?.remoteAddress,
      userAgent: req.get("User-Agent"),
    });

    await purchase.save();

    return res.status(201).json({
      success: true,
      message: "Course purchased successfully!",
      data: {
        purchaseId: purchase._id,
        courseTitle: purchase.courseTitle,
        email: purchase.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to process purchase",
    });
  }
};

// GET - Get All Purchases (Admin Only)
export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Purchases fetched successfully",
      data: purchases,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch purchases",
    });
  }
};

// GET - Get Purchases by Email
export const getPurchasesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    
    const purchases = await Purchase.find({ email: email.toLowerCase() }).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Purchases fetched successfully",
      data: purchases,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch purchases",
    });
  }
};
