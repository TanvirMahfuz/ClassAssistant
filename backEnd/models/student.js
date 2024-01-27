const mongoose = require("mongoose");
const Coureses = require("./Courses");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  session: {
    type: String,
    required: true,
  },
  courses: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    default: [],
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: String,
  },
  uid: {
    type: String,
    default: "",
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
