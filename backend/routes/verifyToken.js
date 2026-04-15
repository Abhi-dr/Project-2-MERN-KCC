const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.header["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token is not present in the request header"
        })
    }

    try {

        const decodedUser = jwt.verify(token, "70e481632c9eecf614b7f388737f3adc3b35fbe3300d8195ac65038780ea1ef6")

        req.user = decodedUser;
        next(); // hold pr rkhio

    } catch (error) {
        return res.status(400).json({
            error: `Error aa gya h: ${error}`
        })
    }

}

module.exports = verifyToken;