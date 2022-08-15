const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event, context, callback) => {
  const req = JSON.stringify(event);
  const username = event.userName;
  const email = event.request.userAttributes.email;
  const info = { username: username, email: email };

  try {
    await saveUser(info)
      .then(() => {
        callback(null, event);
      })
      .catch((err) => {
        console.log(err);
        callback(null, event);
      });
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

function saveUser(userInfo) {
  const params = {
    TableName: "User",
    Item: {
      username: userInfo.username,
      email: userInfo.email,
    },
  };
  return dynamodb.put(params).promise();
}
