import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReadInvoiceComp from "../../components/ReadInvoice";
import { saveAs } from "file-saver";
import moment from "moment";
import { BACKEND_URL } from "../../config";

const ReadInvoice = (props) => {
  const userInfo = props.userInfo;
  console.log("userinfo....", userInfo);
  const invoiceNumber = props.invoiceNumber;
  const [data, setData] = useState({});
  const [deleteRes, setDeleteRes] = useState("");
  const [editRes, setEditRes] = useState("");
  const [download, setDownload] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `${BACKEND_URL}/fetchParticularInvoice?invoiceNumber=${invoiceNumber}`
      )
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchData = () => {
    const api = `${BACKEND_URL}/fetchInvoice?userID=${userInfo.email}`;
    axios
      .get(api)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (invoiceNumber) => {
    axios
      .get(`${BACKEND_URL}/deleteInvoice?invoiceNumber=${invoiceNumber}`)
      .then((response) => {
        setDeleteRes(response.data.body);
        if (response.data.body === "success") {
          alert("Deleted Successfully");
          history.push("/invoiceList");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePayment = (invoiceNumber) => {
    const paidDate = moment(Date.now()).format("MM/DD/yyyy");
    axios
      .get(
        `${BACKEND_URL}/editPayment?invoiceNumber=${invoiceNumber}&paidDate=${paidDate}`
      )
      .then((response) => {
        setEditRes(response.data.data);
        if (response.data.data === "success") {
          fetchData(); // reload data after deleting invoice
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownload = (invoiceNumber) => {
    axios
      .post(`${BACKEND_URL}/savePDF`, {
        invoiceNumber: invoiceNumber,
      })
      .then((res) => {
        setTimeout(function () {
          axios
            .get(`${BACKEND_URL}/PDFreturn?invoiceNumber=${invoiceNumber}`, {
              responseType: "blob",
            })
            .then((response) => {
              const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
              });
              saveAs(pdfBlob, "invoice.pdf");
              setDownload(response.data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }, 3000);
      });
  };

  const handleEmail = (clientInfo) => {
    axios
      .post(`${BACKEND_URL}/sendEmail`, clientInfo)
      .then((response) => {
        console.log(response);
        alert("Email Sent Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error in Sending Email");
      });
  };

  return (
    <>
      <ReadInvoiceComp
        data={data}
        handleDelete={handleDelete}
        handlePayment={handlePayment}
        handleDownload={handleDownload}
        handleEmail={handleEmail}
      />
    </>
  );
};

export default ReadInvoice;
