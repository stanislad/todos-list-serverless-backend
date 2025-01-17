const { filetypeinfo } = require('magic-bytes.js');
const { v4: uuid } = require('uuid');
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

// Enable CORS
app.use(cors({
    origin: '*',  // Be more specific in production
    methods: 'PUT',
    allowedHeaders: ['Content-Type'],  // Allow headers (if needed)
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));
  
app.put("/upload/:id", async (req, res, next) => {
    try {
        const body = JSON.parse(req.body)

        if (!body || !body.image || !body.mime) {
            return res.status(400).json({ message: 'incorrect body on request' });
        }

        if (!allowedMimes.includes(body.mime)) {
            return res.status(400).json({ message: 'mime is not allowed ' });
        }

        let imageData = body.image;
        if (body.image.substr(0, 7) === 'base64,') {
            imageData = body.image.substr(7, body.image.length);
        }

        const buffer = Buffer.from(imageData, 'base64');
        const ext = body.mime.split('/')[1];
        const name = uuid();
        const key = `${name}.${ext}`;

        console.log(`writing image to bucket called ${key}`);

        await s3
            .putObject({
                Body: buffer,
                Key: key,
                ContentType: body.mime,
                Bucket: process.env.imageUploadBucket,
                // ACL: 'public-read', --- don't need this 
            })
            .promise();

        const imageUrl = `https://my-image-upload-bucket-1.s3-eu-west-1.amazonaws.com/${key}`;

        

        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const id = req.params.id

        const result = await dynamodb.update({
            TableName: "TodoTable",
            Key: {
                id
            },
            UpdateExpression: "set imageUrl = :imageUrl",
            ExpressionAttributeValues:{":imageUrl" : imageUrl},
            ReturnValues: "ALL_NEW"
            }).promise()

        // Respond with the completed item
        return res.status(200).json({
            message: 'Todo completed successfully',
            updatedItem: result.Attributes  // `Attributes` will contain the completed item
        })

    } catch (error) {
        console.log('error', error);

        return res.status(400).json({ message: error.message || 'failed to upload image' });
    }
});

app.use((req, res, next) => {
    return res.status(404).json({
      error: "Not Found7",
    });
});

exports.handler = serverless(app);


//check mime and buffer
// const fileInfo = filetypeinfo(buffer);
// const detectedExt = fileInfo.ext;
// const detectedMime = fileInfo.mime;
// if (detectedMime !== body.mime) {
//     return res.status(400).json({ message: 'mime types dont match' });
// }
// console.log(detectedMime+','+body.mime,'...'+detectedExt,'---',imageData)