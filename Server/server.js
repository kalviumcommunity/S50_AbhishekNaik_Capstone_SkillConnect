require('dotenv').config()

const express = require("express"); 
const app = express(); 
const port = process.env.PORT || 3001; 
const DatabaseConnection = require("./config/DatabaseConnection");
const pingRoute = require("./routes/ping");

app.use(express.json()); 

app.use("/ping", pingRoute);

DatabaseConnection();

const server = app.listen(port, () => {
  console.log(`🚀 server running on PORT: ${port}`); 
});

module.exports = server; 
