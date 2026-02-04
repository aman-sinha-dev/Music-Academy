import Contact from "./model.js";
import { contactSchema } from "./validator.js";


export const submitContact = async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);

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

    const contact = new Contact({
      ...parsed.data,
    });

    await contact.save();

    

    return res.status(201).json({
      success: true,
      message: "Thank you for contacting us!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
    });
  }
};

// GET - Get All Contacts (Admin Only)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Contacts fetched successfully",
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
};
