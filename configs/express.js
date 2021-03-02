const express = require("express");

module.exports = async (app) => {
  //Paser body
  app.use(express.json);
  app.use(express.urlencoded({ extended: false }));
};
