import React from "react";
import "../css/Loading.css";
import LoadingIcons from "react-loading-icons";
function Loading() {
  return (
    <div className="loader-container">
        <LoadingIcons.TailSpin className="loader-wrap" /> <p className="text-loading">Loading</p>
    </div>
  );
}

export default Loading;
