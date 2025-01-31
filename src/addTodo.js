const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const app = express();

const {v4}=require('uuid')
const AWS =require('aws-sdk')

// Enable CORS
app.use(cors({
  origin: '*',  // Be more specific in production
  methods: 'POST',
  allowedHeaders: ['Content-Type'],  // Allow headers (if needed)
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Enable JSON body parsing
app.use(express.json());

app.post("/create/", async (req, res, next) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    // const =
    const createdAt = new Date().toISOString();
    const id = v4();

    const newTodo = {
        id,
        todo: req.body.todo,
        description: req.body.description,
        dateTimeDb : req.body.dateTimeDb,
        userId: req.body.userId,
        createdAt,
        completed : false
    }

    await dynamodb.put({
        TableName: "TodoTable",
        Item: newTodo
    }).promise()

  return res.status(200).json({
    message: newTodo,
  });
});

app.use((req, res, next) => {

  return res.status(404).json({
    error: "Not Found1",
  });
});

exports.handler = serverless(app);
