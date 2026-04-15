const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const verifyToken = require("../middleware/verifyToken");

router.post("/ask", verifyToken, aiController.askAi);

module.exports = router;
