var AWS = require("aws-sdk");
var sqs = new AWS.SQS();

exports.handler = async (event) => {
  const req = JSON.stringify(event.invoiceNumber);
  var params = {
    DelaySeconds: 2,
    MessageAttributes: {
      invoiceNumber: {
        DataType: "Number",
        StringValue: req,
      },
    },
    MessageBody: req,
    QueueUrl:
      "https://sqs.us-east-1.amazonaws.com/092337985503/generatePdfQueue",
  };

  let queueRes = await sqs.sendMessage(params).promise();
  const response = {
    statusCode: 200,
    body: queueRes,
  };

  return response;
};
