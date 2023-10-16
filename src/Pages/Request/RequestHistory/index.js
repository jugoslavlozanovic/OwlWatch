import React from "react";
import RequestBox from "../../../Components/RequestBox";

export default function RequestHistory({ requestHistory}) {
  return (
    <>
      <RequestBox requestHistory={requestHistory} />
    </>
  );
}
