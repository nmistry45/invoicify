const AWS = require("aws-sdk");
const moment = require("moment");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const req = JSON.stringify(event);
  const customerInfo = JSON.parse(req);
  let datetime = Date.now();
  console.log("req in saveCustomer....", req);
  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "Customer",
    Item: {
      email: customerInfo.email,
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      creator: customerInfo.creator,
      createdDate: moment(datetime).format("MM/DD/yyyy"),
    },
  };

  try {
    await dynamodb.put(params).promise();
    responseBody = `success`;
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to save Customers: ${err}`;
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
