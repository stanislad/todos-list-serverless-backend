const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const AWS =require('aws-sdk')

// Enable CORS
app.use(cors({
  origin: '*',  // Be more specific in production
  methods: 'GET',
  credentials: true,
}));

app.get("/:id", async (req, res, next) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id = req.params.id

    let todo;

    try {
       // Query DynamoDB to get the item by its id
    const result = await dynamodb.get({
      TableName: "TodoTable", // Replace with your table name
      Key: {
        id, // Use `id` as the primary key to fetch the item
      },
    }).promise();
    todo = result.Item;

       // Check if the item exists
    if (!todo) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }
    } catch (error) {
      console.log(error)
    }

  return res.status(200).json(todo);
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found4",
  });
});

exports.handler = serverless(app);
