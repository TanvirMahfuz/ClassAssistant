const mongoose = require("mongoose");
const Students = require("./student");
const Courses = require("./Courses");
const ClassTestSchema = new mongoose.Schema({
  courseid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    default: "",
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
  ctNo: {
    type: Date,
    default: 0,
  },
});

const CT = mongoose.model("ClassTest", ClassTestSchema);

module.exports = CT;
