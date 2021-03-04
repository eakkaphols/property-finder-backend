const express = require("express");
module.exports = async (app) => {
  // Connect MongoDB
  require("../configs/databases");

  //Paser body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false })); 
};
