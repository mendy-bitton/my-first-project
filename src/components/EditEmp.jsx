import React from "react";
import "../css/EditEmp.css";
import { useState } from "react";
import { motion } from "framer-motion";

function EditTask(props) {
  const [editValue, setEditValue] = useState({ ...props.employee });

  function handleChange(e) {
    const value = e.target.value;
    if (e.target.value !== "") {
      setEditValue({
        ...editValue,
        [e.target.name]: value,
      });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateEmp(props.employee.id, editValue);
    props.hide();
  }

  return (
    <motion.div
      id="editEmp"
      className={`overlay ${props.show ? "show" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration:0.5}}
    >
      <div className="container-edit popup-edit">
        <div className="input-box-edit">
          <span className="title-edit">
            Edit Employee # {props.employee.id}
          </span>
          <a className="close" onClick={props.hide}>
            &times;
          </a>
          <form action="#" onSubmit={(e) => handleSubmit(e)}>
            <label className="label-edit">
              <legend className="legend-edit">First Name:</legend>
              <input
                maxLength="15"
                defaultValue={props.employee.fName}
                onChange={handleChange}
                name="fName"
                className="input-edit"
                type="text"
              />
            </label>
            <label className="label-edit">
              <legend className="legend-edit">Last Name:</legend>
              <input
                maxLength="10"
                defaultValue={props.employee.lName}
                onChange={handleChange}
                name="lName"
                className="input-edit"
                type="text"
              />
            </label>
            <label className="label-edit">
              <legend className="legend-edit">Phone:</legend>
              <input
                maxLength="15"
                defaultValue={props.employee.phone}
                onChange={handleChange}
                name="phone"
                className="input-edit"
                type="text"
              />
            </label>
            <label className="label-edit">
              <legend className="legend-edit">Available:</legend>
              <select
                defaultValue={props.employee.available}
                onChange={handleChange}
                name="available"
                className="check-edit"
                type="text"
              >
                <option value="">-</option>
                <option value="available">Available</option>
                <option value="not available">Not Available</option>
              </select>
            </label>

            <label className="label-edit">
              <legend className="legend-edit">Details:</legend>
              <input
                maxLength="30"
                defaultValue={props.employee.details}
                onChange={handleChange}
                name="details"
                className="input-edit"
                type="text"
              />
            </label>
            <button className="btn-edit" type="submit">
              Edit
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default EditTask;
