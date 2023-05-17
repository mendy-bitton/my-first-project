import React, { useContext, useState } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";
import { Arreys } from "./Context";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Header() {
  const [showNav, setShowNav] = useState(false);
  const {
    setUser,
    setRemember,
    setIsUser,
    setTasksFilterd,
    setEmpsFilterd,
    setTasksSkills,
    setEmpsSkills,
  } = useContext(Arreys);
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      setIsUser(false);
      setRemember(false);
      setTasksFilterd([]);
      setEmpsFilterd([]);
      setEmpsSkills({});
      setTasksSkills({});
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="header">
        <div className="header-container">
          <a className="title-header" href="/Home">
            Mendy's
          </a>

          <motion.nav
            className={showNav ? "navbar active" : "navbar"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              onClick={() => {
                setShowNav(false);
              }}
              to="/Home"
            >
              <span>Home</span>
            </Link>
            <Link
              onClick={() => {
                setShowNav(false);
              }}
              to="/Create"
            >
              <span>About</span>
            </Link>
            <Link
              onClick={() => {
                setShowNav(false);
              }}
              to="/Employees"
            >
              <span>Employees</span>
            </Link>
            <Link
              onClick={() => {
                setShowNav(false);
              }}
              to="/Tasks"
            >
              <span>Tasks</span>
            </Link>
            <button className="logout-btn" onClick={logOut}>
              Log Out
            </button>
          </motion.nav>
        </div>
        <div className="mobile-nav">
          <Hamburger
            color="rgb(110, 109, 109)"
            className="hamburger-nav"
            rounded
            toggled={showNav}
            toggle={setShowNav}
            onToggle={(toggled) => {
              if (toggled) {
                setShowNav(true);
              } else {
                setShowNav(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
