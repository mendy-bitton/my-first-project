import React from 'react'
import "../css/Footer.css";
import {FaGithub} from 'react-icons/fa' 

function Footer() {
  return (
    <footer className='footer'>
        <div className="footer-container">
         <a target="_blank" className='gitHub' href="https://github.com/mendy-bitton"><FaGithub></FaGithub></a>
         <span className='text-git'>mendy bitton</span>
        </div>
        
    </footer>
  )
}

export default Footer