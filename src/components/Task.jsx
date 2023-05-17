import React from "react";
import "../css/Tasks.css";
import EditTask from "./EditTask";
import { useState } from "react";
import { motion } from "framer-motion";
function Task(props) {
  let check = props.task.isCompleted;
  let is_complete = <div style={{ fontSize: "1.2rem" }}>-</div>;
  if (check === "true") {
    is_complete = <div id="Completed">Completed</div>;
  } else if (check === "false") {
    is_complete = <div id="Uncompleted">Uncompleted</div>;
  }
  const task = props.task;
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
      <td data-cell="ID">#{task.taskId}</td>
      <td data-cell="Title">{task.title}</td>
      <td data-cell="Date">{task.date}</td>
      <td data-cell="Status" id="status-cell">
        {is_complete}
      </td>
      <td data-cell="Assigned">
        {task.assigned ? JSON.parse(task.assigned).empName : "-"}
      </td>
      <td data-cell="Notes" className="notes-row">
        {task.notes}
      </td>
      <td data-cell="Edid/Remove">
        <div>
          <button onClick={handleShowPopup} className="edit-small-btn">
            Edit
          </button>
          {showPopup && (
            <EditTask
              show={showPopup}
              hide={handleHidePopup}
              updateTask={props.updateTask}
              task={task}
            />
          )}
          <button className="Remove-btn" onClick={() => props.removeTask(task)}>
            Remove
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

export default Task;
