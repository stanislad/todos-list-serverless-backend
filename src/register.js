const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const app = express();
const {v4}=require('uuid')
const AWS =require('aws-sdk')
const bcrypt = require('bcryptjs');

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

app.post("/register/", async (req, res, next) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    
    const createdAt = new Date().toISOString();
    const id = v4();

    if(await isEmailDublicate(dynamodb, req.body.email)){
      return res.status(203).json({
        info: "email already used",
      });
    }

    const plainPassword = req.body.password;
    const hashedPassword = await hashPassword(plainPassword)

    const newUser = {
        id,
        email: req.body.email,
        password: hashedPassword,
        createdAt
    }

    await dynamodb.put({
        TableName: "UserTable",
        Item: newUser
    }).promise()

    return res.status(200).json({
      info: 'success'
    });
});

app.use((req, res, next) => {

  return res.status(404).json({
    error: "Not Found8",
  });
});

exports.handler = serverless(app);

// Function to hash a password
async function hashPassword(plainPassword) {
    const saltRounds = 10; // Number of hashing rounds (adjust as needed for security vs. performance)
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}

async function isEmailDublicate(dynamodb, email){
  const result = await dynamodb.scan({
    TableName: "UserTable",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  }).promise();

  console.log(email)
  console.log(result.Items)
  console.log(!!result.Items.length)


  return !!result.Items.length
}