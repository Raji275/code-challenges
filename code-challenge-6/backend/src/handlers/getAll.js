const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async () => {
  try {
    console.log('Scanning DynamoDB table:', process.env.DYNAMODB_TABLE);
    
    const result = await dynamoDB.scan({
      TableName: process.env.DYNAMODB_TABLE
    }).promise();

    console.log('Raw DynamoDB response:', JSON.stringify(result.Items, null, 2));

    const items = result.Items.map(item => {
      console.log('Processing item:', item);
      return {
        id: item.id,
        title: item.title || item.content || '',  // Try both title and content
        description: item.description || '',
        status: item.status || 'pending',
        priority: item.priority || 'medium',
        dueDate: item.dueDate || '',
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      };
    });

    console.log('Transformed items:', JSON.stringify(items, null, 2));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(items)
    };
  } catch (error) {
    console.error('GetAll error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: error.message })
    };
  }
};
