const mongoose = require("mongoose");
const Students = require("./student");
const Courses = require("./Courses");
const batchSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  session: {
    type: String,
    required: true,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
  Students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
