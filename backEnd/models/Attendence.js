const mongoose = require("mongoose");
const Students = require("./student");
const Courses = require("./Courses");
const AttentendenceSchema = new mongoose.Schema({
  Course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
  },
  AttNo: {
    type: Date,
  },
  details: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
      },
      present: {
        type: [Number],
        default: 0,
      },
    },
  ],
});

const Attentendence = mongoose.model("Attentendence", AttentendenceSchema);

module.exports = Attentendence;
