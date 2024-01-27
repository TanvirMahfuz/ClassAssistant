const Student = require("../models/student");

function valname(value) {
  // Add your custom validation logic here
  // Example: Check if the name contains only alphabetic characters
  return /^[a-zA-Z ]+$/.test(value);
}
const saveData = async (data) => {
  try {
    await Student.create(data);
    console.log("Data saved successfully.");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};
module.exports = { saveData };
