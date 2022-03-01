const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
import {GetComponentController}  from "./src/Controllers/GetComponentController";
import {AddComponentController}  from "./src/Controllers/AddComponentController";

const app = express();

app.use(express.json());

app.get("/components/:locator", async function (req, res) {

  const controller = new GetComponentController(req, res);

  controller.invoke();  
});

app.post("/components", async function (req, res) {
  const controller = new AddComponentController(req, res);

  controller.invoke();  
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
