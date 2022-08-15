const AWS = require("aws-sdk"); // Load the AWS SDK for Node.js

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let responseBody = "";
  let statusCode = 0;
  let customerData = [];

  try {
    const params = {
      TableName: "Customer",
    };
    var result = await documentClient.scan(params).promise();
    result.Items.map((item, index) => {
      if (item.creator === event.userID) {
        customerData.push(result.Items[index]);
      }
    });
    responseBody = customerData;
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to get Customer: ${err}`;
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
