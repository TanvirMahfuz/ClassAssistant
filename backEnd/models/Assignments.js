const mongoose = require("mongoose");
const Students = require("./student");
const Courses = require("./Courses");
const AssignmentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  Course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
  },
  AssignmentNo: {
    type: Date,
    default: 0,
  },
  details: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
      },
      marks: {
        type: [Number],
        default: 0,
      },
    },
  ],
});

const Assignments = mongoose.model("Assignment", AssignmentSchema);

module.exports = Assignments;
