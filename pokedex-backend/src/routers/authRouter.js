const express = require("express");
const router = express.Router();

const { signUpController } = require("../controllers/auth/signUpController");
const { loginController } = require("../controllers/auth/loginController");

const { signUpSchema, loginSchema } = require("../validations/authValidation");
const { zodValidation } = require("../middlewares/zodValidation");

router.post("/signup", zodValidation(signUpSchema), signUpController);
router.post("/login", zodValidation(loginSchema), loginController);

module.exports = router;
