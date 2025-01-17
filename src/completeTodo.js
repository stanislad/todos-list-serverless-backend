const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const AWS =require('aws-sdk')

// Enable CORS
app.use(cors({
  origin: '*',  // Be more specific in production
  methods: 'PUT',
  allowedHeaders: ['Content-Type'],  // Allow headers (if needed)
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.put("/complete/:id", async (req, res, next) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id = req.params.id
    const completed = JSON.parse(req.body).completed

    try {
      const result = await dynamodb.update({
        TableName: "TodoTable",
        Key: {
          id
        },
        UpdateExpression: "set completed = :completed",
        ExpressionAttributeValues:{":completed" : completed},
        ReturnValues: "ALL_NEW"
        }).promise()

      // Respond with the completed item
      return res.status(200).json({
        message: 'Todo completed successfully',
        updatedItem: result.Attributes  // `Attributes` will contain the completed item
    })

    
    } catch (error) {
      console.log(error)
    }

  return res.status(200).json({
    message: todos,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found6",
  });
});

exports.handler = serverless(app);
