import base64
import boto3


def lambda_handler(event, context):
    s3 = boto3.client("s3")
    bucket_name = "invoice-pdfss"
    file_name = event["queryStringParameters"]["invoiceNumber"] + ".pdf"
    fileObj = s3.get_object(Bucket=bucket_name, Key=file_name)
    file_content = fileObj["Body"].read()
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename={}".format(file_name)
        },
        "body": base64.b64encode(file_content),
        "isBase64Encoded": True,
    }
