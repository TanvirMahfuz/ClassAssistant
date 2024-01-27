const Assignment = require("../models/Assignments");
const Courses = require("../models/Courses");

async function getAssignments(courseid) {
  try {
    const Assignment = await Assignment.find({ courseid: courseid });
    return Assignment;
  } catch (error) {
    console.error("Error getting courses:", error);
    return error;
  }
}

module.exports = {
  getAssignments,
};
