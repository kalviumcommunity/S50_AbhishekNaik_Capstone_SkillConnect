require('dotenv').config()

const express = require("express"); 
const app = express(); 
const port = process.env.PORT || 3001; 
const DatabaseConnection = require("./config/DatabaseConnection");
const pingRoute = require("./routes/ping");
const userRoute = require("./routes/user");
const cors = require("cors");

app.use(express.json()); 

app.use("/ping", pingRoute);
app.use("/user", userRoute);
app.use(cors());
DatabaseConnection();

const server = app.listen(port, () => {
  console.log(`🚀 server running on PORT: ${port}`); 
});

module.exports = server; 
