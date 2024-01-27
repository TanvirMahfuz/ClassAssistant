const ClassTest = require("../models/ClassTest");
const Courses = require("../models/Courses");

async function getCT(courseid) {
  try {
    console.log(courseid);
    const ct = await ClassTest.find({ courseid: courseid });

    return ct[0];
  } catch (error) {
    console.error("Error getting courses:", error);
    return error;
  }
}

module.exports = {
  getCT,
};
