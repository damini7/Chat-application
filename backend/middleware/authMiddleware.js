const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {   //middleware hai esliye next to move the next 
  let token; // variable

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")   //token will be a bearer token
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];    // first wesplit the token

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // now verify it

      req.user = await User.findById(decoded.id).select("-password");   

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };