const Batch = require("../models/Batch");
const course = require("../models/Courses");
const { sessionData } = require("../controllers/batchData");
const { findOne } = require("../models/student");
const router = require("../routes/students");
const bodyParser = require("body-parser");
const Course = require("../models/Courses");
router.use(bodyParser.json());
async function getCourse(data) {
  try {
    const courses = [];
    for (i = 0; i < data.length; i++) {
      courses.push(await course.findById(data[i]));
    }
    return courses;
  } catch (error) {
    console.error("Error getting courses:", error);
    return error;
  }
}
const getAllCourses = async () => {
  try {
    const data = await course.find({}).sort({ courseid: 1 });
    return data;
  } catch (error) {
    console.error("Error getting courses:", error);
    return error;
  }
};

module.exports = {
  getCourse,
  getAllCourses,
};
