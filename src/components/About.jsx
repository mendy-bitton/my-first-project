import React from 'react'
import '../css/About.css'
import { motion } from "framer-motion";
import addTgif from "../addTask.gif"
import addEgif from "../addEmp.gif"
import editTgif from "../editTask.gif"
import editEgif from "../editEmp.gif"
import removeE from "../removeEmp.png"
import removeT from "../removeEmp.png"
function About() {
  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5}}>
      <h2 className='title1-about'>Our Guide How To Use:</h2>
      <div className='container-guide'>
      <span className='title2-about'>Create A new Employee:</span>
      <img src={addEgif} className='img-guide-about' alt="" />
      <span className='title2-about'>Create A new Task:</span>
      <img src={addTgif} className='img-guide-about' alt="" />
      <span className='title2-about'>Edit Employee:</span>
      <img src={editEgif} className='img-guide-about' alt="" />
      <span className='title2-about'>Edit Task:</span>
      <img src={editTgif} className='img-guide-about' alt="" />
      <span className='title2-about'>Remove Employee:</span>
      <img src={removeE} className='img-guide-about' alt="" />
      <span className='title2-about'>Remove Task:</span>
      <img src={removeT} className='img-guide-about' alt="" />
      </div>
    </motion.div>
  )
}

export default About