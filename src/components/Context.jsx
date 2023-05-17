import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth } from "../Firebase";
export const Arreys = createContext();
function Context({ children }) {
  const db = getFirestore();
  const [remember, setRemember] = useState(false);
  const [logForm, setLogForm] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState(null);
  const [tasksDb, setTasksDb] = useState([]);
  const [empsDb, setEmpsDb] = useState([]);
  const [empsFilterd, setEmpsFilterd] = useState([]);
  const [tasksFilterd, setTasksFilterd] = useState([]);
  const [checkEmps, setCheckEmps] = useState("all");
  const [checkTasks, setCheckTasks] = useState("all");
  const [tasksSkills, setTasksSkills] = useState({});
  const [empsSkills, setEmpsSkills] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const empsRef = collection(db, "Employees");
  const tasksRef = collection(db, "Tasks");


  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsUser(true);
      
    }
  }, []);

  useEffect(() => {
    if (isUser) {
      if (remember) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      getEmpData();
      getTasksData(); 
    }
   
  }, [isUser]);

  const childrenEmpsDb = () => {
    setEmpsFilterd(empsDb);
    updateEmpsSkills();
  };
  const childrenTasksDb = () => {
    setTasksFilterd(tasksDb);
    updateTasksSkills();
  };

  useEffect(() => {
    if (empsDb[0] !== undefined || tasksDb[0] !== undefined) {
      childrenEmpsDb();
      childrenTasksDb();
      setLoadingPage(false);
    } 
  }, [empsDb, tasksDb]);

  useEffect(() => {
    if (empsFilterd[0] !== undefined || tasksFilterd[0] !== undefined) {
      setLoadingPage(false);
    }
  }, [empsFilterd.length, tasksDb.length]);

  const getEmpData = async () => {
    const arr = query(empsRef, where("userUid", "==", user.userUid), orderBy("createAt"));
    const snapshot = await getDocs(arr);
    const tempData = [];
    snapshot.forEach((doc) => {
      tempData.push({ ...doc.data(), id: doc.id });
    });
    if (tempData.length !== 0) {
      setEmpsDb(tempData);
      console.log("1");
    } else {
      setEmpsDb([]);
      setEmpsFilterd([]);
      setEmpsSkills({});
      console.log("1.5");
       setLoadingPage(false);
    }
  };

  const getTasksData = async () => {
    const arr = query(tasksRef, where("userUid", "==", user.userUid), orderBy("createAt"));
    const snapshot = await getDocs(arr);

    const tempData = [];
    snapshot.forEach((doc) => {
      tempData.push({ ...doc.data(), id: doc.id });
    });
    if (tempData.length !== 0) {
      setTasksDb(tempData);
      console.log("2");
    } else {
      setTasksDb([]);
      setTasksFilterd([]);
      setTasksSkills({});
      console.log("2.5");
      setLoadingPage(false);
    }
  };

  const changeCheckEmps = (e) => {
    setCheckEmps(e.target.value);
  };

  function changeEmpsFilterd() {
    switch (checkEmps) {
      case "all":
        setEmpsFilterd(empsDb);
        break;

      case "available":
        setEmpsFilterd(
          empsDb.filter((employee) => {
            return employee.available === "available";
          })
        );
        break;

      case "not available":
        setEmpsFilterd(
          empsDb.filter((employee) => {
            return employee.available === "not available";
          })
        );
        break;

      case "on a task":
        setEmpsFilterd(
          empsDb.filter((employee) => {
            return employee.available === "on a task";
          })
        );
        break;
      default:
        setEmpsFilterd(empsDb);
        break;
    }
  }
  const changeCheckTasks = (e) => {
    setCheckTasks(e.target.value);
  };
  function changeTasksFilterd() {
    switch (checkTasks) {
      case "all":
        setTasksFilterd(tasksDb);
        break;

      case "completed":
        setTasksFilterd(
          tasksDb.filter((task) => {
            return task.isCompleted === "true";
          })
        );
        break;

      case "uncompleted":
        setTasksFilterd(
          tasksDb.filter((task) => {
            return task.isCompleted === "false";
          })
        );
        break;

      default:
        setTasksFilterd(tasksDb);
        break;
    }
  }

  function updateTasksSkills() {
    let completedArrey = tasksDb.filter((task) => task.isCompleted === "true");
    let uncompletedArrey = tasksDb.filter(
      (task) => task.isCompleted === "false"
    );
    let number =
      completedArrey.length !== 0
        ? (completedArrey.length / tasksDb.length) * 100
        : 0;
    let number2 =
      uncompletedArrey.length !== 0
        ? (uncompletedArrey.length / tasksDb.length) * 100
        : 0;
    number = number.toFixed(0);
    number2 = number2.toFixed(0);
    setTasksSkills({ completed: number, uncompleted: number2 });
    console.log("3");
  }

  function updateEmpsSkills() {
    let availableArrey = empsDb.filter((emp) => emp.available === "available");
    let notAvailableArrey = empsDb.filter(
      (emp) => emp.available === "not available"
    );
    let onTaskArrey = empsDb.filter((emp) => emp.available === "on a task");
    let number1 =
      availableArrey.length !== 0
        ? (availableArrey.length / empsDb.length) * 100
        : 0;
    let number2 =
      notAvailableArrey.length !== 0
        ? (notAvailableArrey.length / empsDb.length) * 100
        : 0;
    let number3 =
      onTaskArrey.length !== 0 ? (onTaskArrey.length / empsDb.length) * 100 : 0;
    number1 = number1.toFixed(0);
    number2 = number2.toFixed(0);
    number3 = number3.toFixed(0);
    setEmpsSkills({
      available: number1,
      notAvailable: number2,
      onTask: number3,
    });
    console.log("4");
  }

  return (
    <Arreys.Provider
      value={{
        db,
        remember,
        setRemember,
        logForm,
        setLogForm,
        isUser,
        setIsUser,
        user,
        setUser,
        tasksDb,
        setTasksDb,
        empsDb,
        setEmpsDb,
        empsFilterd,
        setEmpsFilterd,
        tasksFilterd,
        setTasksFilterd,
        checkEmps,
        setCheckEmps,
        checkTasks,
        setCheckTasks,
        empsSkills,
        setEmpsSkills,
        tasksSkills,
        setTasksSkills,
        loadingPage,
        setLoadingPage,
        empsRef,
        tasksRef,
        getEmpData,
        getTasksData,
        changeCheckEmps,
        changeEmpsFilterd,
        changeCheckTasks,
        changeTasksFilterd,
        updateEmpsSkills,
        updateTasksSkills,
        childrenEmpsDb,
        childrenTasksDb,
      }}
    >
      {children}
    </Arreys.Provider>
  );
}

export default Context;
