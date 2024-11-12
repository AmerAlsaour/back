const express = require("express");
const app = express();
const parser = require("body-parser");
const authRouter = require("./routes/auth");
const tutorsRouter = require("./routes/teachers");
const studentRouter = require("./routes/student");
const { default: mongoose } = require("mongoose");
app.use(parser.json({ limit: "50mb" }));
app.use("/images", express.static("images"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRouter);
app.use("/tutors", tutorsRouter);
app.use("/student", studentRouter);
app.use((error, req, res, next) => {
  console.log(error);
  const message = error.message;
  const status = error.statusCode || 500;
  res.status(status).json({
    Message: message,
  });
});
const port =3000 || process.env.PORT;
mongoose
  .connect(
    "mongodb://localhost:27017/learningapp"
  )
  .then((a) => {
    app.listen(port,()=>{
      console.log("connected");
    });
  })
  .catch((e) => {
    console.log('error in conection'+e);
  });
