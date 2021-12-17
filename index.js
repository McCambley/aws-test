require('dotenv').config()

const {AWS_KEY_ID, AWS_SECRET } = process.env
console.log({AWS_KEY_ID, AWS_SECRET})