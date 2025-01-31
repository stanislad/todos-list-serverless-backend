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

app.get("/todos/:userId", async (req, res, next) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    let todos;

    try {
      const results = await dynamodb.scan({
        TableName: "TodoTable",
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": req.params.userId,
        },
      }).promise()
      todos = results.Items
    } catch (error) {``
      console.log(error)
    }

  return res.status(200).json({
    message: (!todos || todos.length === 0) ? [] : todos,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found2",
  });
});

exports.handler = serverless(app);
