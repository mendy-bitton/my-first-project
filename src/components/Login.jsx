import React, { useContext, useEffect, useState } from "react";
import "../css/Login.css";
import "../css/SignUp.css";
import { motion } from "framer-motion";
import { Arreys } from "./Context";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import LoadingIcons from "react-loading-icons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { toast } from "react-toastify";
function Login() {
  const { setIsUser, setUser, remember, setRemember } = useContext(Arreys);
  const [userInput, setUserInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [logSign, setLogSign] = useState(true);
  const [check, setCheck] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setRemember(check);
  }, [check]);

  useEffect(() => {
    let timeout;
    if (showError) {
      timeout = setTimeout(() => setShowError(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showError]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoadingIcon(true);
    try {
      await createUserWithEmailAndPassword(auth, emailInput, passInput);
      await updateProfile(auth.currentUser, {displayName: userInput})
      setUser({
        email: emailInput,
        password: passInput,
        userUid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName
      });
      setIsUser(true);
      setLoadingIcon(false);
      navigate("/Home");
    } catch (err) {
      console.error(err);
      toast(err.message, {type:"error"}) 
      setShowError(true);
      setLoadingIcon(false);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoadingIcon(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailInput,
        passInput
      );
      setUser({
        email: emailInput,
        password: passInput,
        userUid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName
      });
      setIsUser(true);
      setLoadingIcon(false);
      navigate("/Home");
    } catch (err) {
      toast(err.message, {type:"error"}) 
      console.error(err);
      setShowError(true);
      setLoadingIcon(false);
    }
  };

  const changeLogForm = () => {
    setLogSign(!logSign);
    setEmailInput("");
    setPassInput("");
  };

  return (
    <div>
      {logSign && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="container-login"
        >
          <div className="title-login">Login</div>
          <form action="#" onSubmit={(e) => handleLogIn(e)}>
            <div className="input-zone-login">
              <div
                className={
                  showError
                    ? "input-box1-login error-animate"
                    : "input-box1-login"
                }
              >
                <input
                  className="user-input-login"
                  required
                  name="email"
                  defaultValue={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                  }}
                  type="email"
                />
                <label className="user-label-login" htmlFor="">
                  Email
                </label>
              </div>
              <div
                className={
                  showError
                    ? "input-box2-login error-animate"
                    : "input-box2-login"
                }
              >
                <input
                  className="pass-input-login"
                  required
                  defaultValue={passInput}
                  onChange={(e) => {
                    setPassInput(e.target.value);
                  }}
                  type="password"
                  name="password"
                />
                <label className="pass-label-login" htmlFor="">
                  Password
                </label>
              </div>
              <div className="remember-login">
                <input
                  onChange={() => {
                    setCheck(!check);
                  }}
                  className="remember-login-check"
                  type="checkbox"
                />
                <label>Remember Me</label>
              </div>
              {showError && (
                <motion.div className="error-msg">
                  Username or Password not correct! try again!{" "}
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className="btn1-login"
              type="submit"
              onClick={handleLogIn}
            >
              <div>
                {!loadingIcon ? (
                  "Login"
                ) : (
                  <LoadingIcons.TailSpin height="1.5rem" />
                )}
              </div>
            </motion.button>
          </form>
          <div className="line-login"></div>
          <span className="firstText-login">First Time?</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={changeLogForm}
            className="btn2-login"
            type="button"
          >
            Sign Up
          </motion.button>
        </motion.div>
      )}
      {!logSign && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="container-signup"
        >
          <div className="title-signup">Sign Up</div>
          <form action="#" onSubmit={(e) => handleSignUp(e)}>
            <div className="input-zone-signup">
              <div  className={
                  showError
                    ? "input-box1-signup error-animate"
                    : "input-box1-signup"
                }>
                <input
                  maxLength={15}
                  className="user-input-signup"
                  required
                  onChange={(e) => {
                    setUserInput(e.target.value);
                  }}
                  name="userName"
                  type="text"
                />
                <label className="user-label-signup" htmlFor="">
                  Username
                </label>
              </div>
              <div
                className={
                  showError
                    ? "input-box3-signup error-animate"
                    : "input-box3-signup"
                }
              >
                <input
                  className="email-input-signup"
                  defaultValue={emailInput}
                  required
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                  }}
                  name="email"
                  type="email"
                />
                <label className="email-label-signup" htmlFor="">
                  Email
                </label>
              </div>
              <div
                className={
                  showError
                    ? "input-box2-signup error-animate"
                    : "input-box2-signup"
                }
              >
                <input
                  className="pass-input-signup"
                  required
                  defaultValue={passInput}
                  onChange={(e) => {
                    setPassInput(e.target.value);
                  }}
                  name="password"
                  type="password"
                />
                <label className="pass-label-signup" htmlFor="">
                  Password
                </label>
              </div>
              <div className="remember-signup">
                <input
                  type="checkbox"
                  onChange={() => {
                    setCheck(!check);
                  }}
                />
                <label className="form-check-label" htmlFor="">
                  Remember Me
                </label>
              </div>
              {showError && (
                <motion.div className="error-msg-signup">
                  Email or Password not correct! try again!
                </motion.div>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className="btn-signup"
              type="submit"
              onClick={handleSignUp}
            >
              <div>{!loadingIcon ? (
                  "Sign Up"
                ) : (
                  <LoadingIcons.TailSpin height="1.5rem" />
                )}</div>
            </motion.button>
          </form>
          <span onClick={changeLogForm} className="log-link-signup">
            Already Have An Account? Login!
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default Login;
