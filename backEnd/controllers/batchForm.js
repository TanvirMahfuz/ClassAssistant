const Batch = require("../models/Batch");
const Course = require("../models/Courses");
const ClassTest = require("../models/ClassTest");
const Assignments = require("../models/Assignments");
const Attentendence = require("../models/Attendence");

function valname(value) {
  // Add your custom validation logic here
  // Example: Check if the name contains only alphabetic characters
  return /^[a-zA-Z ]+$/.test(value);
}

const storeForm = async (data) => {
  console.log("file was in controller");
  try {
    await Batch.create(data);
    console.log("Data saved successfully.");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

const createBatchCourses = async (session, newCourses) => {
  try {
    const courseCT = new ClassTest({});
    const courseAssignment = new Assignments({});
    const courseAttendence = new Attentendence({});
    // Assuming Batch is a Mongoose model
    const batch = await Batch.findOne({ session: session });
    console.log(batch + "\n\n\n\n");
    if (batch) {
      const course = await Course.findOne({ courseid: newCourses.courseid });

      if (!course) {
        const acourse = new Course({
          coursename: newCourses.course_name,
          courseid: newCourses.courseid,
          assigned_to: batch,
          CT: courseCT,
          ASSIGNMENTS: courseAssignment,
          ATT: courseAttendence,
        });
        courseCT.courseid = acourse;
        for (let i = 0; i < batch.Students.length; i++) {
          ob = { student: batch.Students[i], marks: [0, 0, 0, 0] };
          courseCT.details.push(ob);
        }
        await courseCT.save();
        for (let i = 0; i < batch.Students.length; i++) {
          ob = { student: batch.Students[i], marks: [0, 0, 0, 0] };
          courseAssignment.details.push(ob);
        }
        courseAssignment.Course = acourse;
        await courseAssignment.save();
        courseAttendence.Course = acourse;
        await courseAttendence.save();
        await acourse.save();
        batch.courses.push(acourse);
      } else {
        course.assigned_to.push(batch);
        batch.courses.push(course);
      }

      await batch.save(); // Save the changes to the batch
    } else {
      console.log("Batch not found.");
    }

    // Return the updated batch
    return await Batch.findOne({ session: session });
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Rethrow the error to handle it at a higher level
  }
};

module.exports = { storeForm, createBatchCourses };
