import bcrypt from "bcryptjs";
import connectDB from "./config/database.js";
import Admin from "./app/admin/model.js";

const seedAdmin = async () => {
  try {
    await connectDB();
    console.log("Connected to database...");

    const email = "admin@gmail.com";
    const password = "123456";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin created successfully!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
