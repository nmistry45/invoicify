const AWS = require("aws-sdk"); // Load the AWS SDK for Node.js

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "Invoice",
    Key: {
      invoiceNumber: parseInt(event.invoiceNumber),
    },
  };

  try {
    const data = await documentClient.delete(params).promise();
    responseBody = "success";
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to delete Product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: responseBody,
  };

  return response;
};
