const AWS = require("aws-sdk"); // Load the AWS SDK for Node.js

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "Invoice",
    Key: {
      invoiceNumber: event.invoiceNumber,
    },
    UpdateExpression:
      "set notes = :notes, currency = :currency, tax = :tax, dueDate = :dueDate, products = :products",
    ExpressionAttributeValues: {
      ":notes": event.notes,
      ":currency": event.currency,
      ":tax": event.tax,
      ":dueDate": event.dueDate,
      ":products": event.products,
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
