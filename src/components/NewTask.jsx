import React, { useContext } from "react";
import "../css/NewTask.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { Arreys } from "./Context";
import { doc, updateDoc } from "firebase/firestore";
function NewTask(props) {
  const { empsDb, db, updateTask, tasksRef, getEmpData } = useContext(Arreys);
  const [newValue, setNewValue] = useState({
    title: "",
    date: "",
    isCompleted: "false",
    assigned: null,
    notes: "",
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
    props.addTask(newValue);
    handleAssigned();
    props.hide();
  };
  const handleAssigned = async () => {
    if (newValue.assigned !== null) {
      const docRef = doc(db, "Employees", JSON.parse(newValue.assigned).id);
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
      id="newTask"
      className={`overlay-new ${props.show ? "show-new" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-new popup-new">
        <div className="input-box-new">
          <span className="title-new">Add A New Task</span>
          <a className="close" onClick={props.hide} href="#">
            &times;
          </a>
          <form onSubmit={handleSubmitAdd} action="#">
            <label className="label-new">
              <legend className="legend-new">Title:</legend>
              <input
                maxLength="15"
                required
                onChange={handleChange}
                name="title"
                className="input-new"
                type="text"
              />
            </label>
            <label className="label-new">
              <legend className="legend-new">Date:</legend>
              <input
                maxLength="10"
                onChange={handleChange}
                name="date"
                className="input-new"
                type="date"
              />
            </label>
            <label className="label-new">
              <legend className="legend-new">Status:</legend>
              <select
                onChange={handleChange}
                name="isCompleted"
                className="check-new"
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
                <option value="">-</option>
                {empsDb.map((employee) => {
                  if (employee.available === "available") {
                    return (
                      <option
                        key={employee.id}
                        value={JSON.stringify({
                          id: employee.id,
                          empName: `${employee.fName + " " + employee.lName}`,
                        })}
                      >
                        {employee.fName + " " + employee.lName}
                      </option>
                    );
                  }
                })}
              </select>
            </label>

            <label className="label-new">
              <legend className="legend-new">Notes:</legend>
              <input
                maxLength="30"
                onChange={handleChange}
                name="notes"
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
              Add A new Task
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default NewTask;
