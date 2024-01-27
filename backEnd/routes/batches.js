const express = require("express");
const router = express.Router();
const path = require("path");
const courses = require("../models/Courses");
const Student = require("../models/student");
router.use(express.json());
const { getBatchData } = require("../controllers/batchData");
let current_batch = null;
const batches = path.join(__dirname, "../../frontEnd/batch.html");
//console.log(batches);

router.get("/", async (req, res) => {
  res.status(200).sendFile(batches);
});
router.use(
  "/pictures",
  express.static(path.join(__dirname, "../../frontEnd/pictures"))
);
router.get("/session", async (req, res) => {
  try {
    let batchInfo = {
      name: String,
      session: current_batch,
      courses: [],
    };
    const batchData = await getBatchData(current_batch);
    console.log("\n\n" + batchData + "\n\n");
    const { getCourse } = require("../controllers/Courses");
    for (i = 0; i < batchData.length; i++) {
      batchInfo.name = batchData[i].name;
      const course = await getCourse(batchData[i].courses);
      console.log(course);
      for (j = 0; j < course.length; j++) {
        batchInfo.courses.push({
          // Push an object containing coursename and courseid
          coursename: course[j].coursename,
          courseid: course[j].courseid,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Data submitted successfully for session ${batchInfo}`,
      data: { batchInfo },
    });
  } catch (error) {
    console.error("Error processing form:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const storeForm = require("../controllers/batchForm");
router.post("/storebatchform", (req, res) => {
  // Handle the form submission logic here
  const { name, session } = req.body;

  // Creating a JavaScript object
  const batchObject = {
    name,
    session,
  };
  console.log(batchObject);
  const { storeForm } = require("../controllers/batchForm");
  const simulateSuccess = true;
  if (simulateSuccess) {
    res.status(200).json({
      success: true,
      message: "Form submitted successfully",
      data: batchObject,
    });
  } else {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const { sessionData } = require("../controllers/batchData");

router.get("/getSessions", async (req, res) => {
  try {
    const sessions = await sessionData(); // Call the sessionData function

    // Send the sessions array as a JSON response
    res.json({ sessions });
  } catch (error) {
    console.error("Error getting sessions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addCourses", async (req, res) => {
  try {
    console.log("control was at addCourses");
    const { updateBatchCourses } = require("../controllers/batchForm");
    const { course_name, courseid } = req.body;

    // Assuming current_batch is defined somewhere
    const result = await updateBatchCourses(current_batch, {
      courseid,
      course_name,
    });
    console.log(result);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Form submitted successfully",
      });
    } else {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error getting sessions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getCourseData", async (req, res) => {
  try {
    const viewpage = path.join(
      __dirname,
      "../../frontEnd/batches/newtest.html"
    );
    res.sendFile(viewpage);
  } catch (error) {
    console.error("Error processing form:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/:session", async (req, res) => {
  try {
    const session = req.params.session; // Assuming the session is sent in the request body
    current_batch = session;
    const viewpage = path.join(
      __dirname,
      "../../frontEnd/batches/batchData.html"
    );
    res.sendFile(viewpage);
  } catch (error) {
    console.error("Error processing form:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
module.exports = router;

//project make ove
