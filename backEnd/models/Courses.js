const mongoose = require("mongoose");
const Students = require("./student");
const Batch = require("./Batch");
const Attentendence = require("./Attendence");
const ClassTest = require("./ClassTest");
const Assignments = require("./Assignments");

const courseSchema = new mongoose.Schema({
  coursename: {
    type: String,
  },
  courseid: {
    type: String,
  },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
  CT: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassTest",
      },
    ],
    default: [],
  },
  ATT: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendence",
      },
    ],
    default: [],
  },
  ASSIGNMENTS: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignments",
      },
    ],
    default: [],
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
