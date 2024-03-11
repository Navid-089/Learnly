import 'normalize.css';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Menu.module.css';

const StudentMenuContainer = ({ onSelectOption }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  const handleOptionClick = (option) => {
    onSelectOption(option);
  };

  return (
    <div className={styles.menucontainer}>

      {/* <div className={styles.header}>
          <img src="/LogoDark.png" alt="Image" />
      </div> */}


      <div className={styles.menu}>
        <ul>
          <li><img src="/LogoDark.png" alt="Image" /></li>
          <li onClick={() => handleOptionClick('home')}>Home</li>
          <li onClick={() => handleOptionClick('my-profile')}>My Profile</li>
          <li onClick={() => handleOptionClick('my-tutors')}>My Tutors</li>
          <li onClick={() => handleOptionClick('all-batches')}>All Batches</li>
          <li onClick={() => handleOptionClick('enrolled-batches')}>Enrolled Batches</li>
          <li onClick={() => handleOptionClick('request-tutor')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Request Tutor
          {showOptions && (
          <span className= {styles.options} >
            <li onClick={() => handleOptionClick('post_request')}>Option 1</li>
            <li onClick={() => handleOptionClick('handle_request')}> Option 2</li>
          </span>
        )}</li>
          <li onClick={() => handleOptionClick('demo-lectures')}>Demo Lectures</li>
          <li><Link href="/">Logout</Link></li>
          {/* Add more menu options */}
        </ul>
        
      </div>
      
    </div>
  );
};

export default StudentMenuContainer;
