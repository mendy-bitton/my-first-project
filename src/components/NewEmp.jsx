import React from "react";
import "../css/NewEmp.css";
import { useState } from "react";
import { motion } from "framer-motion";
function NewEmp(props) {
  const [newValue, setNewValue] = useState({
    fName: "",
    lName: "",
    phone: "",
    available: "available",
    details: "",
  });

  function handleChange(e) {
    const value = e.target.value;
    if (e.target.value !== "") {
      setNewValue({
        ...newValue,
        [e.target.name]: value,
      });
    }
  }

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    props.addEmp(newValue);
    props.hide();
  };

  return (
    <motion.div
      id="newEmp"
      className={`overlay-new ${props.show ? "show-new" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration:0.5}}
    >
      <div className="container-new popup-new-emp">
        <div className="input-box-new">
          <span className="title-new">Add A New Employee</span>
          <a className="close" onClick={props.hide} href="#">
            &times;
          </a>
          <form onSubmit={handleSubmitAdd} action="#">
            <label className="label-new">
              <legend className="legend-new">First Name:</legend>
              <input
                maxLength="15"
                required
                onChange={handleChange}
                name="fName"
                className="input-new"
                type="text"
              />
            </label>
            <label className="label-new">
              <legend className="legend-new">Last Name:</legend>
              <input
                maxLength="10"
                onChange={handleChange}
                name="lName"
                className="input-new"
                type="text"
              />
            </label>
            <label className="label-new">
              <legend className="legend-new">Phone:</legend>
              <input
                maxLength="15"
                onChange={handleChange}
                name="phone"
                className="input-new"
                type="tel"
              />
            </label>
            <label className="label-new">
              <legend className="legend-new">Available:</legend>
              <select
                onChange={handleChange}
                name="available"
                className="check-new"
                type="text"
              >
                <option value="">-</option>
                <option value="available">Available</option>
                <option value="not available">Not Available</option>
              </select>
            </label>

            <label className="label-new">
              <legend className="legend-new">Details:</legend>
              <input
                maxLength="30"
                onChange={handleChange}
                name="details"
                className="input-new"
                type="text"
              />
            </label>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onSubmit={handleSubmitAdd}
              className="btn-new"
              type="submit"
            >
              Add A new Employee
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default NewEmp;
