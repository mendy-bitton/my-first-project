import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Employee from "./Employee";
import NewEmp from "./NewEmp";
import "../css/Employees.css";
import { motion } from "framer-motion";
import { Arreys } from "./Context";
import {
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { type } from "@testing-library/user-event/dist/type";
function Employees() {
  const {
    db,
    empsRef,
    getEmpData,
    empsDb,
    user,
    empsFilterd,
    setLoadingPage,
    changeEmpsFilterd,
    checkEmps,
    changeCheckEmps,
    loadingPage,
  } = useContext(Arreys);
  

  useEffect(() => {
    changeEmpsFilterd();
  }, [checkEmps]);
  const updateEmp = async (id, value) => {
    setLoadingPage(true);
    let tempRef = doc(db, "Employees", id);
    await updateDoc(tempRef, value);
    toast("The Employee Was Edited Successfully!", {type:"success"})   
    getEmpData();
  };

  const addEmp = async (emp) => {
    setLoadingPage(true);
    let doc = { ...emp, userUid: user.userUid, createAt: serverTimestamp() };
    await addDoc(empsRef, doc);
    toast("The Employee Was Added Successfully!", {type:"success"})  
    getEmpData();
  };

  const removeEmp = async (id) => {
    setLoadingPage(true);
    const tempDoc = doc(db, "Employees", id);
    await deleteDoc(tempDoc);
    try {
      toast("The Employee Was Removed Successfully!", {type:"success"})   
      getEmpData();
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
          className="container-employees"
        >
          <div className="nav-employees">
            <div className="title-employees">Employees:</div>
            <nav className="btns-employees">
              <button onClick={changeCheckEmps} value="all" id="All">
                All
              </button>
              <button
                onClick={changeCheckEmps}
                value="available"
                id="Available"
              >
                Available
              </button>
              <button
                onClick={changeCheckEmps}
                value="not available"
                id="Not-Available"
              >
                Not Available
              </button>
              <button
                onClick={changeCheckEmps}
                value="on a task"
                id="On-A-Task"
              >
                On A Task
              </button>
            </nav>
          </div>
          <motion.div className="employees-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone</th>
                  <th>Available</th>
                  <th>Details</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {empsFilterd.map((employee, index) => (
                  <Employee
                    employee={{ ...employee, empId: index + 1 }}
                    removeEmp={removeEmp}
                    updateEmp={updateEmp}
                    key={index}
                  />
                ))}
              </tbody>
            </table>
            {empsDb.length === 0 && (
              <h2 className="no-emp-text">You Have No Employees!</h2>
            )}
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleAddNew}
            className="add-employee"
          >
            Add A New Employee
          </motion.button>
          {showAdd && (
            <NewEmp show={showAdd} hide={handleAddNew} addEmp={addEmp} />
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Employees;
