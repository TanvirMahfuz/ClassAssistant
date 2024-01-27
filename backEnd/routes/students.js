const express = require("express");
const router = express.Router();
const path = require("path");
const courses = require("../models/Courses");
const Student = require("../models/student");
const Batch = require("../models/Batch");
const Assignment = require("../models/Assignments");
const { getCT } = require("../controllers/ClassTest");
router.use(express.json());
const { getStudent } = require("../controllers/Students");
const { getAssignments } = require("../controllers/Assignments");
const { getStudentById } = require("../controllers/Students");
router.use(
  "/pictures",
  express.static(path.join(__dirname, "../../frontEnd/pictures"))
);

let currentCourse, nextData;

router.get("/", getStudent);

router.get("/coursepage", async (req, res) => {
  const courseName = req.query.courseid;

  currentCourse = await courses.find({ coursename: courseName });
  try {
    const CT = await getCT(currentCourse);
    const data = [];
    for (let i = 0; i < CT.details.length; i++) {
      const st = await getStudentById(CT.details[i].student);
      const student = {
        id: st.id,
        name: st.name,
        session: st.session,
        ct: CT.details[i].marks,
        ctAvg: 0, // Initialize ctAvg
        coursename: courseName,
        courseid: currentCourse[0].courseid,
      };

      let total = 0,
        cnt = 0;

      for (let j = 0; j < student.ct.length; j++) {
        if (student.ct[j] === 0) {
          continue;
        }
        total += student.ct[j];
        cnt++;
      }

      student.ctAvg = total / cnt;
      data.push(student);
    }

    nextData = data;
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

//coursepage
router.get("/getCourseData", async (req, res) => {
  try {
    console.log(nextData);
    res.status(200).json({
      success: true,
      message: `Data submitted successfully.`,
      data: { nextData },
    });
  } catch (error) {
    console.error("Error processing form:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
