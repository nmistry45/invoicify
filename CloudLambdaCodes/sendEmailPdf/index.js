var aws = require("aws-sdk");
var nodemailer = require("nodemailer");
var s3 = new aws.S3();

function getS3File(bucket, key) {
  return new Promise(function (resolve, reject) {
    s3.getObject(
      {
        Bucket: bucket,
        Key: key,
      },
      function (err, data) {
        if (err) return reject(err);
        else return resolve(data);
      }
    );
  });
}

exports.handler = function (event, context, callback) {
  getS3File("invoice-pdfss", `${event.invoiceNumber}.pdf`)
    .then(function (fileData) {
      var mailOptions = {
        from: "invoicifyapp@gmail.com",
        subject: "Email from Invoicify",
        html: `<p>Please find attached the Invoice from the Retailer.`,
        to: `${event.client.email}`,
        // bcc: Any BCC address you want here in an array,
        attachments: [
          {
            filename: `${event.invoiceNumber}.pdf`,
            content: fileData.Body,
            path: `https://invoice-pdfss.s3.amazonaws.com/${event.invoiceNumber}.pdf`,
          },
        ],
      };

      // create Nodemailer transporter
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "invoicifyapp@gmail.com",
          pass: "dodfiiqayytzipjj",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // send email
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          console.log("Error sending email");
          callback(err);
        } else {
          console.log("Email sent successfully");
          callback();
        }
      });
    })
    .catch(function (error) {
      console.log(error);
      console.log("Error getting attachment from S3");
      callback(error);
    });
};
