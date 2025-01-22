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

console.log(111111111)

app.post("/create/", async (req, res, next) => {
  console.log(222222222)
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    // const =
    const createdAt = new Date().toISOString();
    const id = v4();

    console.log('this is id : '+id)

    const newTodo = {
        id,
        todo: req.body.todo,
        description: req.body.description,
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
  console.log(3333333)
  return res.status(404).json({
    error: "Not Found1",
  });
});

exports.handler = serverless(app);
