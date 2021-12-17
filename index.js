require('dotenv').config();
const fs = require('fs');
const AWS = require('aws-sdk');
const { ConnectContactLens } = require('aws-sdk');


const {AWS_KEY_ID, AWS_SECRET, BUCKET_NAME } = process.env

const s3 = new AWS.S3({
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: AWS_SECRET
});

// s3.createBucket({
//     Bucket: BUCKET_NAME,
//     CreateBucketConfiguration: {
//         // Set your region here
//         LocationConstraint: "eu-west-1"
//     }
// }, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });

const uploadFile = (fileName, fileKey) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileKey, // File name you want to save as in S3
        Body: fileContent,
        ACL: 'public-read',
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log({data})
        console.log(`File uploaded successfully. ${data.Location}`);
        
    });
};

uploadFile('/Users/mccambley/dev/aws-test/files/Project_calendar.pdf', 'firstPdf.pdf')