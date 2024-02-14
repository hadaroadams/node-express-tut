require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const errohandlerMiddleware = require('./middleware/error-handler')
const notFound= require('./middleware/notFound')

connectDB();

const PORT = process.env.PORT;
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public",'index.html'))
});
app.use("/api/v1/users", require("./routes/api/tasks"));


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','404.html'))
}) 

app.use(errohandlerMiddleware)
app.use(notFound)
mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
  });
});
