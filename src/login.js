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

app.post("/login/", async (req, res, next) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let user;

  try {
    const result = await dynamodb.scan({
      TableName: "UserTable",
      FilterExpression: "email = :email AND password = :password",
      ExpressionAttributeValues: {
        ":email": req.body.email,
        ":password": req.body.password,
      },
    }).promise();
    user = result.Items;

      // Check if the item exists
    if (!user) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    if(user.length > 0){
      return res.status(200).json({message: "user authorised"});
    }else{
      return res.status(401).json({message: "invalid credentials"});
    }
  
  } catch (error) {
    console.log(error)
  }
});

app.use((req, res, next) => {

  return res.status(404).json({
    error: "Not Found9",
  });
});

exports.handler = serverless(app);
