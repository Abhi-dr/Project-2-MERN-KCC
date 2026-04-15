const express = require("express");
const { register, login } = require("../controllers/authController");
const verifyToken = require("./verifyToken");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// authentication k baad ka ek route

router.get("/my-profile", verifyToken, () => {
    console.log("This is the text which you will see only after authentication")
})


module.exports = router;