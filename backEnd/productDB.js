const connectDB = require("./database/connect");
const Student = require("./models/student");
const Course = require("./models/Courses");
require("dotenv").config();
const Batch = require("./models/Batch");
const ClassTest = require("./models/ClassTest");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // Find the student you want to include in the batch
    const foundStudent1 = await Student.findOne({ name: "Tanvir Mahfuz" });
    const foundStudent2 = await Student.findOne({
      name: "Md. Wahiduzzaman Chowdhury",
    });
    const foundCourseid = await Course.findOne({
      coursename: "Simulation and Modeling",
    });
    // Create an instance of the ClassTest model with the found student
    const newBatch = new ClassTest({
      courseid: foundCourseid._id,
      details: [
        { student: foundStudent1._id, marks: [17, 20, 18, 0] }, // Assuming 'foundStudent._id' is the ID of the student
        { student: foundStudent2._id, marks: [18, 18, 17, 15] }, // Assuming '6150c43e6b5b4f72e361eb30' is the ID of another student
      ],
      ctNo: Date.now(),
    });

    // Save the ClassTest instance to the database
    newBatch
      .save()
      .then((result) => {
        console.log("ClassTest saved:", result);
      })
      .catch((error) => {
        console.error("Error saving ClassTest:", error);
      });
  } catch (err) {
    console.log(err);
  }
};

start();
