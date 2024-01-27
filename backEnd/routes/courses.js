const express = require("express");
const router = express.Router();
const path = require("path");
router.use(express.json());
const courses = require("../models/Courses");
const Student = require("../models/student");
const Batch = require("../models/Batch");
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

router.post("/addCourses", async (req, res) => {
  try {
    console.log("control was at addCourses");
    const { createBatchCourses } = require("../controllers/batchForm");
    const { course_name, courseid, session } = req.body;

    // Assuming current_batch is defined somewhere
    const result = await createBatchCourses(session, {
      courseid,
      course_name,
    });

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

const { getAllCourses } = require("../controllers/Courses");
router.get("/getCourseData", async (req, res) => {
  try {
    const courses = await getAllCourses();
    let data = [];
    for (let i = 0; i < courses.length; i++) {
      const batch = await Batch.findById(courses[i].assigned_to);
      let ob = {
        coursename: courses[i].coursename,
        courseid: courses[i].courseid,
        session: batch.session,
      };
      data.push(ob);
    }
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error getting sessions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/getCourses", async (req, res) => {
  try {
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
