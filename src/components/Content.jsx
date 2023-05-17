import React, { useContext } from "react";
import "../css/Content.css";
import Tasks from "./Tasks";
import Home from "./Home";
import Employees from "./Employees";
import Login from "./Login";
import { Route, Routes, useLocation } from "react-router-dom";
import { Arreys } from "./Context";
import Header from "./Header";
import Header1 from "./Header1";
import About from "./About";
import Footer from "./Footer";
import Loading from "./Loading";

function Content() {
  const location = useLocation();
  const {isUser} = useContext(Arreys);
  return (
    <div className="main">
      {isUser ? <Header /> : <Header1 />}
      <div className="main-container">
        {!isUser && (
          <Routes>
           <Route path="*" element={<Login />}></Route>
          </Routes>
        )}
        {isUser && (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/Create" element={<About />}></Route>
            <Route path="/Employees" element={<Employees />}></Route>
            <Route path="/Tasks" element={<Tasks />}></Route>
            <Route path="/Loading" element={<Loading />}></Route>
          </Routes>
        )}
      </div> 
      <Footer/>
    </div>
  );
}

export default Content;
