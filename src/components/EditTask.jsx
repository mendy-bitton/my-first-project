import React, { useContext } from "react";
import "../css/EditTask.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { Arreys } from "./Context";
import { doc, updateDoc } from "firebase/firestore";
function EditTask(props) {
  const [editValue, setEditValue] = useState({ ...props.task });
  const {empsDb, getEmpData, db} = useContext(Arreys);

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
    props.updateTask(props.task.id, editValue);
    handleAssigned();
    props.hide();
  };
  const handleAssigned = async () => {
    if (editValue.assigned !== null) {
      const docRef = doc(db, "Employees", JSON.parse(editValue.assigned).id);
      console.log(docRef);
      await updateDoc(docRef, { available: "on a task" });
      try {
        await getEmpData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <motion.div
      id="editTask"
      className={`overlay ${props.show ? "show" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container-edit popup-edit">
        <div className="input-box-edit">
          <span className="title-edit">Edit Task # {props.task.id}</span>
          <a className="close" href="#" onClick={props.hide}>
            &times;
          </a>
          <form action="#" onSubmit={(e) => handleSubmit(e)}>
            <label className="label-edit">
              <legend className="legend-edit">Title:</legend>
              <input
                maxLength="15"
                defaultValue={props.task.title}
                onChange={handleChange}
                name="title"
                className="input-edit"
                type="text"
              />
            </label>
            <label className="label-edit">
              <legend className="legend-edit">Date:</legend>
              <input
                maxLength="10"
                defaultValue={props.task.date}
                onChange={handleChange}
                name="date"
                className="input-edit"
                type="date"
              />
            </label>
            <label className="label-new">
              <legend className="legend-new">Status:</legend>
              <select
                defaultValue={props.task.isCompleted}
                onChange={handleChange}
                name="isCompleted"
                className="check-edit"
                type="text"
              >
                <option value="">-</option>
                <option value="true">Completed</option>
                <option value="false">Uncompleted</option>
              </select>
            </label>
            <label className="label-new">
              <legend className="legend-new">Assigned:</legend>
              <select
                onChange={handleChange}
                name="assigned"
                className="check-new"
              >
                <option value={null}>
                  {"-"}
                </option>
                {empsDb.map((employee) => {
                  if (employee.available === "available") {
                    return (
                      <option key={employee.id} value={JSON.stringify({
                        id: employee.id,
                        empName: `${employee.fName + " " + employee.lName}`,
                      })}>
                        {employee.fName + " " + employee.lName}
                      </option>
                    );
                  }
                })}
              </select>
            </label>
            <label className="label-edit">
              <legend className="legend-edit">Notes:</legend>
              <input
                maxLength="30"
                defaultValue={props.task.notes}
                onChange={handleChange}
                name="notes"
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
