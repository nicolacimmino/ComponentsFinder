const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");
import {ComponentsApiTransformer}  from "./Transformers/ComponentApiTransformer";
import {ComponentsRepository}  from "./Repositories/ComponentsRepository";

const app = express();

const COMPONENTS_TABLE = process.env.COMPONENTS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get("/components/:locator", async function (req, res) {

  try {
    const component = await ComponentsRepository.getByLocator(req.params.locator);
  
    if (component) {      
      res.json(ComponentsApiTransformer.toApi(component));
    } else {
      res.status(404).json({ error: 'NOT_FOUND' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "INTERNAL" });
  }
});

app.post("/components", async function (req, res) {
  const { locator, category, description } = req.body;
  // if (typeof userId !== "string") {
  //   res.status(400).json({ error: '"userId" must be a string' });
  // } else if (typeof name !== "string") {
  //   res.status(400).json({ error: '"name" must be a string' });
  // }

  const params = {
    TableName: COMPONENTS_TABLE,
    Item: {
      locator: locator,
      category: category,
      description: description
    },
  };

  try {
    const Item = await dynamoDbClient.put(params).promise();
    res.json(ComponentsApiTransformer.toApi(Item));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create component" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
