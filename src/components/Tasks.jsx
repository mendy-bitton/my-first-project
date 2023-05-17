import React from "react";
import "../css/Tasks.css";
import Task from "./Task";
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import { useContext } from "react";
import { Arreys } from "./Context";
import NewTask from "./NewTask";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loading from "./Loading";
import {
  updateDoc,
  getDocs,
  addDoc,
  deleteDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
function Tasks() {
  const {
    db,
    tasksRef,
    getTasksData,
    user,
    tasksFilterd,
    setLoadingPage,
    changeTasksFilterd,
    checkTasks,
    changeCheckTasks,
    loadingPage,
    getEmpData
  } = useContext(Arreys);

  useEffect(() => {
    changeTasksFilterd();
  }, [checkTasks]);

  const updateTask = async (id, value) => {
    setLoadingPage(true);
    let tempRef = doc(db, "Tasks", id);
    await updateDoc(tempRef, value);
    toast("The Task Was Edited Successfully!", {type:"success"})   
    getTasksData();
  };

  const addTask = async (task) => {
    setLoadingPage(true);
    let doc = { ...task, userUid: user.userUid, createAt: serverTimestamp()};
    await addDoc(tasksRef, doc);
    toast("The Task Was Added Successfully!", {type:"success"})   
    console.log(doc);
    getTasksData();
  };

  const removeTask = async (task) => {
    setLoadingPage(true);
    const tempDoc = doc(db, "Tasks", task.id);
    console.log(task);
    await deleteDoc(tempDoc);
    try {
     if(task.assigned !== null)
     { const docRef = doc(db, "Employees", JSON.parse(task.assigned).id);
      await updateDoc(docRef, { available: "available" });}
      try {
        toast("The Task Was Remove Successfully!", {type:"success"})   
        await getTasksData();
        await getEmpData();
      } catch (error) {
        toast(error.message, {type:"error"}) 
        console.error(error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [showAdd, setShowAdd] = useState(false);
  function handleAddNew() {
    setShowAdd(!showAdd);
  }

  return (
    <div>
      {loadingPage && <Loading />}
      {!loadingPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="container-tasks"
        >
          <div className="nav-tasks">
            <div className="title-tasks">Tasks:</div>
            <nav className="btns">
              <button onClick={changeCheckTasks} value="all" id="All">
                All
              </button>
              <button
                onClick={changeCheckTasks}
                value="completed"
                id="Completed"
              >
                Completed
              </button>
              <button
                onClick={changeCheckTasks}
                value="uncompleted"
                id="Uncompleted"
              >
                Uncompleted
              </button>
            </nav>
          </div>
          {/* <Popup trigger={<button> Trigger</button>} position="right center">
      <div>Popup content here !!</div>
      </Popup> */}
          <div className="tasks-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Assigned</th>
                  <th>Notes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tasksFilterd.map((task, index) => (
                  <Task
                    task={{ ...task , taskId: index +1}}
                    removeTask={removeTask}
                    updateTask={updateTask}
                    key={index}
                  />
                ))}
              </tbody>
            </table>
            {tasksFilterd.length === 0 && (
              <h2 className="no-task-text">You Have No Tasks!</h2>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleAddNew}
            className="add-task"
          >
            Add A New Task
          </motion.button>
          {showAdd && (
            <NewTask show={showAdd} hide={handleAddNew} addTask={addTask} />
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Tasks;
