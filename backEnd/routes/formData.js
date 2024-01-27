const express = require("express");
const router = express.Router();
const path = require("path");
router.use(express.json());
const form = path.join(__dirname, "../../frontEnd/form.html");

console.log("form get");
router.get("/", async (req, res) => {
  console.log("form get");
  res.status(200).sendFile(form);
});

// POST endpoint to handle form submissions

router.post("/submit", (req, res) => {
  // Handle the form submission logic here
  const { name, id, email, phone, session } = req.body;

  // Creating a JavaScript object
  const studentObject = {
    name,
    id,
    contact: { email, phone },
    session,
  };
  console.log(studentObject);
  const { saveData } = require("../controllers/studentform");
  const ok = saveData(studentObject);
  console.log("saveData returns " + ok);
  const simulateSuccess = true;
  //if(!ok){simulateSuccess = false; }// Change this to false to simulate failure
  if (simulateSuccess) {
    res.status(200).json({
      success: true,
      message: "Form submitted successfully",
      data: studentObject,
    });
  } else {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
