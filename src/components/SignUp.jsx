import React from "react";
import "../css/SignUp.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useContext } from "react";
import { Arreys } from "./Context";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
function SignUp() {
  const { 
    isUser,
    user, 
    setUser,
    setIsUser,
    logForm,
    setLogForm
   } = useContext(Arreys);
  const [remember, setRemember] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");


  // useEffect(()=> {
  //   console.log(isUser);
  //   console.log(auth.currentUser);
  // }, [])

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, emailInput, passInput);
      // setIsUser(true)
      setUser({email: emailInput, password: passInput})
      console.log(auth.currentUser)
      console.log(user)
    } catch (err) {
      console.error(err);
    }
  };
  const changeLogForm = () => {
    setLogForm(true);
  };
  // const handlesubmit = () => {
    //     if (remember) {
    //       localStorage.setItem("user", JSON.stringify(newUser));
    //     }
    //     setUsers([...users], newUser)
    //     setIsUser(true);
    //     setUser(newUser)
    // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container-signup"
    >
      <div className="title-signup">Sign Up</div>
      <div className="input-zone-signup">
        {/* <div className="input-box1-signup">
          <input
            className="user-input-signup"
            required
            onChange={handleChange}
            name="userName"
            type="text"
          />
          <label className="user-label-signup" htmlFor="">
            Username
          </label>
        </div> */}
        <div className="input-box3-signup">
          <input
            className="email-input-signup"
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
        <div className="input-box2-signup">
          <input
            className="pass-input-signup"
            required
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
            onChange={(e) => {
              setRemember(e.target.value);
            }}
            defaultValue={remember}
          />
          <label className="form-check-label" htmlFor="">
            Remember Me
          </label>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        className="btn-signup"
        type="submit"
        onClick={handleSignUp}
      >
        <div>Sign in</div>
      </motion.button>
      <span
        onClick={changeLogForm}
        className="log-link-signup"
      >
        Already Have An Account? Login!
      </span>
    </motion.div>
  );
}

export default SignUp;
