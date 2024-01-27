const student = require("../models/student");

const getStudent = async (req, res) => {
  console.log(req.query);
  const myData = await student.find(req.query);
  res.status(200).json(myData);
};

const getBatchStudent = async (batch) => {
  const myData = await student.find({ batch: batch });
  return myData;
};
const getStudentById = async (id) => {
  const myData = await student.findOne(id);
  return myData;
};

module.exports = { getStudent, getBatchStudent, getStudentById };
