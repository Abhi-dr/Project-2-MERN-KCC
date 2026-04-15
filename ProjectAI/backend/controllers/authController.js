const User   = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt    = require("jsonwebtoken");

// ── REGISTER ──────────────────────────────
const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Sab fields bharo!" });
    }

    // Email pehle se exist toh nahi karta?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already registered!" });
    }

    // Password hash karo — plain text kabhi save nahi karte
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
};

// ── LOGIN ─────────────────────────────────
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Sab fields bharo!" });
    }

    // User dhundo
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Email registered nahi hai!" });
    }

    // Password check karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Galat password!" });
    }

    // JWT token banao
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.status(200).json({
        message: "Login successful!",
        token,
        user: { username: user.username, email: user.email }
    });
};

module.exports = { register, login };