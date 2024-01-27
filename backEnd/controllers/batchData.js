const Batch = require("../models/Batch");
const Course = require("../models/Courses");
const current_batch = null;
const getBatchData = async (session) => {
  try {
    const myData = await Batch.find({ session: session }); // Replace 'session' with the actual field in your MongoDB collection
    return myData;
  } catch (error) {
    console.error("Error getting batch data:", error);
    throw error; // You might want to handle the error appropriately based on your application logic
  }
};
async function sessionData() {
  try {
    const sessions = await Batch.find().distinct("session");
    console.log(sessions);
    return sessions;
    // res.json(sessions.map((session) => ({ session })));
  } catch (error) {
    console.error("Error getting sessions:", error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getBatchData, sessionData };
