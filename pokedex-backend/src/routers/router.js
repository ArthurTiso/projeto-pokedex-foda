
const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");



// rota de teste
router.get("/", (req, res) => {
  res.send("teste 123");
});

router.use("/auth", authRouter);

module.exports = router;
 