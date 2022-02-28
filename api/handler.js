const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const COMPONENTS_TABLE = process.env.COMPONENTS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get("/components/:locator", async function (req, res) {
  const params = {
    TableName: COMPONENTS_TABLE,
    Key: {
      locator: req.params.locator,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { locator, category, description } = Item;
      res.json({ locator, category, description });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find component with given "locator"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive component" });
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
    await dynamoDbClient.put(params).promise();
    res.json({ locator, category, description });
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
