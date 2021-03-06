const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");

//Routes Uses
const userRoute =require("./routes/userRoute");
const postRoute =require("./routes/postRoute")

const app = express();

// Connect to Mongo
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use('/public', express.static('public'));

//Routes
app.use('/api/user/',userRoute);
app.use('/api/posts/',postRoute);

app.get('/',(req,res)=>{
  res.send('<html><body><h1>Hello World</h1></body></html>');
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));