const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id },
      UpdateExpression: 'SET title = :title, description = :description, #status = :status, priority = :priority, dueDate = :dueDate, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':title': data.title,
        ':description': data.description,
        ':status': data.status,
        ':priority': data.priority,
        ':dueDate': data.dueDate,
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDB.update(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result.Attributes)
    };
  } catch (error) {
    console.error('Update error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: error.message })
    };
  }
};
