const PDFKit = require("pdfkit");
const AWS = require("aws-sdk");

const s3 = new AWS.S3();
var sqs = new AWS.SQS();
var queueURL =
  "https://sqs.us-east-1.amazonaws.com/092337985503/generatePdfQueue";

const generatePDF = async (text) => {
  return new Promise((resolve) => {
    const doc = new PDFKit();
    const buffers = [];
    const productList = text.products;
    const clientList = text.client;
    doc.fontSize(12);
    doc.text(`INVOICE DETAILS`, {
      align: "center",
      underline: true,
    });
    doc.moveDown();
    doc.text(`Invoice Number: ${text.invoiceNumber}`, { align: "right" });
    doc.text(`Date: ${text.createdAt}`, { align: "right" });
    doc.text(`Due Date: ${text.dueDate}`, { align: "right" });
    doc.text(`Payment Date: ${text.paid_date}`, { align: "right" });
    doc.moveDown();
    doc.text(`CLIENT DETAILS`, {
      align: "left",
      underline: true,
    });
    doc.text(`Name: ${clientList.name}`);
    doc.text(`Address: ${clientList.address}`);
    doc.text(`Email: ${clientList.email}`);
    doc.text(`Phone: ${clientList.phone}`);
    doc.moveDown();
    doc.text(`PRODUCT DETAILS`, {
      align: "left",
      underline: true,
    });
    productList.forEach((product) => {
      doc.text(`Item Name: ${product.itemName}`);
      doc.text(`unitPrice: ${product.unitPrice}`);
      doc.text(`quantity: ${product.quantity}`);
      doc.text(`discount: ${product.discount}`);
    });
    doc.moveDown();
    doc.text(`INVOICE SUMMARY`, {
      align: "right",
      underline: true,
    });
    doc.text(`Sub Total: ${text.subTotal}`, {
      align: "right",
    });
    doc.text(`VAT(%): ${text.vat}`, {
      align: "right",
    });
    doc.text(`Total: ${text.total}`, {
      align: "right",
    });
    doc.text(`Tax: ${text.taxRate}`, {
      align: "left",
    });
    doc.text(`Currency: ${text.currency}`, {
      align: "left",
    });
    doc.text(`Additional Notes: ${text.notes}`, {
      align: "left",
    });
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdf = Buffer.concat(buffers);
      resolve(pdf);
    });
    doc.end();
  });
};

const fetchInvoice = async (invoiceNo) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "Invoice",
    Key: {
      invoiceNumber: parseInt(invoiceNo),
    },
  };
  var result = await documentClient.get(params).promise();
  return JSON.stringify(result);
};

const savePDF = async (key, pdf) => {
  return await new Promise((resolve) => {
    s3.putObject(
      {
        Bucket: "invoice-pdfsss",
        Key: key,
        Body: pdf,
        ContentType: "application/pdf",
        ACL: "public-read",
      },
      (err, result) => {
        if (err) console.log("ERROR!", err);
        if (result) {
          console.log("RESULT!", result);
          resolve(result);
        }
      }
    );
  });
};

// const readSQSMsg = async () => {
//   var params = {
//     AttributeNames: ["SentTimestamp"],
//     MaxNumberOfMessages: 10,
//     MessageAttributeNames: ["All"],
//     QueueUrl: queueURL,
//     VisibilityTimeout: 60,
//     WaitTimeSeconds: 20,
//   };

//   let queueRes = await sqs.receiveMessage(params).promise();
//   const response = {
//     statusCode: 200,
//     body: queueRes,
//   };

//   return response;
// };

const generateURI = (keyValue) =>
  `https://invoice-pdfsss.s3.us-east-1.amazonaws.com/${keyValue}`;

exports.handler = async (event, context) => {
  let sqsContent = "";
  sqsContent = event.Records[0].body;
  let key = `${sqsContent}.pdf`;
  const d = await fetchInvoice(sqsContent);
  const text = JSON.parse(d) || "Pending...";
  return generatePDF(text.Item)
    .then((pdf) => savePDF(key, pdf))
    .then(() => ({
      statusCode: 200,
      body: generateURI(key),
    }));
};
