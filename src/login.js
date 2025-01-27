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

app.post("/login/", async (req, res, next) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let user;

  try {
    const result = await dynamodb.scan({
      TableName: "UserTable",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": req.body.email,
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
      for(const i in user){
        const storedHashedPassword = user[i].password;
        console.log(storedHashedPassword, req.body.password)
        const isPasswordValid = await bcrypt.compare(req.body.password, storedHashedPassword);
        if(isPasswordValid) 
          return res.status(200).json({info: "user authorised", userId : user[i].id});
        else 
          continue
      }
    }

    return res.status(401).json({message: "invalid credentials1"});
  
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
