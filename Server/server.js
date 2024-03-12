require('dotenv').config()

const express = require("express"); 
const app = express(); 
const port = process.env.PORT || 3001; 
const DatabaseConnection = require("./config/DatabaseConnection");
const pingRoute = require("./routes/ping");
const userRoute = require("./routes/user");

app.use(express.json()); 

app.use("/", pingRoute);
app.use("/user", userRoute);

DatabaseConnection();

const server = app.listen(port, () => {
  console.log(`🚀 server running on PORT: ${port}`); 
});

module.exports = server; 
