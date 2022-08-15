const AWS = require("aws-sdk");
const moment = require("moment");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const req = JSON.stringify(event);

  const invoiceInfo = JSON.parse(req);
  let datetime = Date.now();
  invoiceInfo.createdAt = moment(datetime).format("MM/DD/yyyy");
  invoiceInfo.invoiceNumber = Math.floor(Math.random() * 100000);
  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "Invoice",
    Item: invoiceInfo,
  };
  try {
    await dynamodb.put(params).promise();
    responseBody = `success`;
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to save invoice: ${err}`;
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
