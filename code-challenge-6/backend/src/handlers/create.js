const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    console.log('=== CREATE TASK START ===');
    console.log('Received form data:', {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate
    });

    if (!data.title) {
      console.log('Validation failed: Missing title');
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Title is required' })
      };
    }

    const timestamp = new Date().toISOString();
    const item = {
      id: uuidv4(),
      title: data.title || '',
      description: data.description || '',
      status: data.status || 'pending',
      priority: data.priority || 'medium',
      dueDate: data.dueDate || null,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    console.log('Saving task to DynamoDB:', JSON.stringify(item, null, 2));

    await dynamoDB.put({
      TableName: process.env.DYNAMODB_TABLE,
      Item: item
    }).promise();

    console.log('Task saved successfully');
    console.log('=== CREATE TASK END ===');

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(item)
    };
  } catch (error) {
    console.error('Create error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: error.message })
    };
  }
};


