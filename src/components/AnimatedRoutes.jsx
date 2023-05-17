import React from "react";
import Tasks from "./Tasks";
import Home from "./Home";
import Employees from "./Employees";
import Create from "./Create";
import Login from "./Login";
import SignUp from "./SignUp"
import { AnimatePresence } from "framer-motion";
const AnimatedRoutes = () => {
  return (
    <AnimatePresence>
      <Home/>
      <Create/>
      <Tasks/>
      <Employees/>
      <Login/>
      <SignUp/>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
