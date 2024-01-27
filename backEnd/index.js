const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const path = require("path");
const connectDB = require("./database/connect");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
//app.use(express.static(path.join(__dirname, "../../frontEnd")));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//checking database connection
const student_routes = require("./routes/students");
app.use("/api/students", student_routes);

//main home
const myHome = require("./routes/home");
app.use("/api", myHome);
app.use("/api/home", myHome);

// student form
const formData = require("./routes/formData");
app.use("/api/form", formData);

//batch info
const batch_data = require("./routes/batches");
app.use("/api/batches", batch_data);

//Clastest
const student_data = require("./routes/students");
app.use("/api/data/Students", student_data);

//courses
const course_data = require("./routes/courses");
app.use("/api/Courses", course_data);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
