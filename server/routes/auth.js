const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");
const router = express.Router();

// Configuration for Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// API for User Registration
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    // Extract form data
    const { firstName, lastName, email, password } = req.body;

    // Check if profile image is uploaded
    const profileImage = req.file;
    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    // Path to uploaded profile image
    const profileImagePath = profileImage.path;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    // Save the new user
    await newUser.save();

    // Send success response
    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});



// API for Login 
router.post("/login", async (req, res) => {
    try {
        // take the information from the form
        const { email, password } = req.body;


        // check if user exist
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(409).json({ message: "Invalid email or User doesn't  exist!" });
        }

        /* compare the password with the hash passward */
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message:"Invalid Credential"})
        }
        
        // generate JWT token
        // jwt_ secret kuch bhi lelo 
        //token login hone ke baad generate karenge taaki uski help se 
        //apan koi bhi kaam karapye uss particular user ke liye 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password;

        res.status(200).json({ token, user });


    } catch (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
    }
})
module.exports = router;