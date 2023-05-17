import React from "react";
import { motion } from "framer-motion";
import "../css/Home.css";
import { useContext } from "react";
import { Arreys } from "./Context";
import Loading from "./Loading";
import { auth } from "../Firebase";
function Home() {
  const {
    user,
    empsSkills, 
    tasksSkills,
    loadingPage
  } = useContext(Arreys);
  return (
    <div>
      {loadingPage && <Loading />}
      {!loadingPage && (
        <motion.div
          className="container-home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="wraper1">
            <h1 className="title-home">Hi {user.displayName},</h1>
            <div className="text-home">
              <span className="title2-home">
                <span>Wellcome To Mendy's!</span>
              </span>
              <span className="title3-home">
                <span>
                  The Best Tasks Manager <br />
                </span>
                <span>In The World!</span>
              </span>
            </div>
            <div className="icon1-home"></div>
          </div>
          <div className="wraper2">
            <div className="emp-home">
              <span className="title-chart-home">Employees:</span>
              <span className="category-chart-home">Available</span>
              <div className="container-row">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${empsSkills.available}%` }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="skills available-bar"
                >
                  {empsSkills.available}%
                </motion.div>
              </div>
              <span className="category-chart-home">Not Available</span>
              <div className="container-row">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${empsSkills.notAvailable}%` }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="skills notAvailable-bar"
                >
                  {empsSkills.notAvailable}%
                </motion.div>
              </div>
              <span className="category-chart-home">On A Task</span>
              <div className="container-row">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${empsSkills.onTask}%` }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="skills onTask-bar"
                >
                  {empsSkills.onTask}%
                </motion.div>
              </div>
            </div>

            <div className="task-home">
              <span className="title-chart-home">Tasks:</span>
              <span className="category-chart-home">Completed</span>
              <motion.div className="container-row">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tasksSkills.completed}%` }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="skills completed-bar"
                >
                  {tasksSkills.completed}%
                </motion.div>
              </motion.div>
              <span className="category-chart-home">Uncompleted</span>
              <div className="container-row">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tasksSkills.uncompleted}%` }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="skills uncompleted-bar"
                >
                  {tasksSkills.uncompleted}%
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Home;
