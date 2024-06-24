const express = require('express');
const morgan= require("morgan");
const cors = require("cors");
const userAuth = require("./routes/auth")

const app = express();
app.use(cors());
app.use(morgan('short'))
app.use(express.json());


app.use("/auth",userAuth);

app.listen(8082, () => {
  console.log("listening");
});
