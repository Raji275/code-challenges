const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    await dynamoDB.delete({
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id }
    }).promise();

    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: error.message })
    };
  }
};

