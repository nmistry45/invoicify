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
    UpdateExpression: "set payment_status = :n, paid_date = :pd ",
    ExpressionAttributeValues: {
      ":n": "Paid",
      ":pd": event.paidDate,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = "success";
    statusCode = 204;
  } catch (err) {
    responseBody = `Unable to update Product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    data: responseBody,
  };

  return response;
};
