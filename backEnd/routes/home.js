const express = require("express");
const router = express.Router();
const path = require("path");

const index = path.join(__dirname, "../../frontEnd/index.html");
router.use(
  "/pictures",
  express.static(path.join(__dirname, "../../frontEnd/pictures"))
);
//const {home} = require'../controllers/home');
router.get("/", async (req, res) => {
  res.status(200).sendFile(index);
});
module.exports = router;

//project make over
