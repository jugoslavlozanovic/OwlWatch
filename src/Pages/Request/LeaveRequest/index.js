import React from "react";
import RequestForm from "../../../Components/RequestForm";

export default function LeaveRequest({
  setDateFrom,
  setDateTo,
  setComments,
  sendRequest,
  setValidation,
  validation,
  dateTo,
  dateFrom,
  comments,
  date,
  setAlertClass,
  setMessage
}) {
  return (
    <>
      <RequestForm
        setComments={setComments}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        sendRequest={sendRequest}
        setValidation={setValidation}
        validation={validation}
        dateFrom={dateFrom}
        dateTo={dateTo}
        comments={comments}
        date={date}
        setAlertClass={setAlertClass}
        setMessage={setMessage}
      />
    </>
  );
}
