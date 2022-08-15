const AWS = require("aws-sdk"); // Load the AWS SDK for Node.js

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let responseBody = "";
  let statusCode = 0;
  let userData = {};

  try {
    const params = {
      TableName: "User",
    };
    var result = await documentClient.scan(params).promise();
    result.Items.map((item, index) => {
      let dbUsername = item.username;
      let feUsername = event.username;
      let comparedString = dbUsername.localeCompare(feUsername);
      if (comparedString === 0) {
        userData = result.Items[index];
      }
    });

    responseBody = userData;
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to get User: ${err}`;
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
