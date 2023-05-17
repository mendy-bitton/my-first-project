import React from "react";
import "../css/Employees.css";
import { useState } from "react";
import EditEmp from "./EditEmp";
import { motion } from "framer-motion";
function Employee(props) {
  let check = props.employee.available;
  let available = <div style={{ fontSize: "1.2rem" }}>-</div>;
  if (check === "available") {
    available = <div id="Available">Available</div>;
  } else if (check === "not available") {
    available = <div id="Not-Available">Not Available</div>;
  } else if (check === "on a task") {
    available = <div id="On-A-Task">On A Task</div>;
  }
  const emp = props.employee;
  const [showPopup, setShowPopup] = useState(false);
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <td data-cell="ID">#{emp.empId}</td>
      <td data-cell="First Name">{emp.fName}</td>
      <td data-cell="Last Name">{emp.lName}</td>
      <td data-cell="Phone">{emp.phone}</td>
      <td data-cell="Available">{available}</td>
      <td data-cell="Details" className="details-row">
        {emp.details}
      </td>
      <td data-cell="Edit/Remove">
        <div>
          <button onClick={handleShowPopup} className="edit-btn-employee">
            Edit
          </button>
          {showPopup && (
            <EditEmp
              show={showPopup}
              hide={handleHidePopup}
              updateEmp={props.updateEmp}
              employee={emp}
            />
          )}
          <button
            className="Remove-btn-employee"
            onClick={() => props.removeEmp(emp.id)}
          >
            Remove
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

export default Employee;
