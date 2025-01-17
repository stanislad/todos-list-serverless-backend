const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const AWS =require('aws-sdk')

// Enable CORS
app.use(cors({
  origin: '*',  // Be more specific in production
  methods: 'DELETE',
  allowedHeaders: ['Content-Type'],  // Allow headers (if needed)
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.delete("/delete/:id", async (req, res, next) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id = req.params.id

    try {
      const result = await dynamodb.delete({
        TableName: "TodoTable",
        Key: {
          id
        },
        ReturnValues: "ALL_OLD"
        }).promise()

      // Respond with the delete item
      return res.status(200).json({
        message: 'Todo deleted successfully',
        deletedItem: result.Attributes  // `Attributes` will contain the delete item
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
    error: "Not Found5",
  });
});

exports.handler = serverless(app);
