const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const AWS =require('aws-sdk')

// Enable CORS
app.use(cors({
  origin: '*',  // Be more specific in production
  methods: 'POST',
  allowedHeaders: ['Content-Type'],  // Allow headers (if needed)
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.post("/update/:id", async (req, res, next) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id = req.params.id
    const todoName = JSON.parse(req.body).todo
    const description = JSON.parse(req.body).description
    const dateTimeDb = JSON.parse(req.body).dateTimeDb

    try {
      const result = await dynamodb.update({
        TableName: "TodoTable",
        Key: {
          id
        },
        UpdateExpression: "set todo = :todo, description = :description, dateTimeDb = :dateTimeDb",
        ExpressionAttributeValues:{":todo" : todoName, ":description": description, ":dateTimeDb": dateTimeDb},
        ReturnValues: "ALL_NEW"
        }).promise()

      // Respond with the updated item
      return res.status(200).json({
        message: 'Todo updated successfully',
        updatedItem: result.Attributes  // `Attributes` will contain the updated item
    })

    
    } catch (error) {
      console.log(error)
    }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found3",
  });
});

exports.handler = serverless(app);
