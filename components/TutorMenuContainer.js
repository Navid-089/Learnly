import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/TutorMenu.module.css"
import { useRouter } from "next/router";

const TutorMenuContainer = ({ onSelectOption }) => {

  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleSubOptionClick = (subOption) => {
    onSelectOption(subOption);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const handleLogoutClick=() =>{
    localStorage.removeItem("token");
    router.push("http://localhost:3000");

  };



  const handleOptionClick = (e) => {
    onSelectOption(e);
  };

  return (
    <div className={styles.menucontainer}>
      <div className={styles.menu}>
        <ul>
          <li onClick={() => handleOptionClick("tuition-posts")}>
            
          </li>
          <li  onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            
          >
          Tuition Posts
            {showOptions && (
              <ul >
                <li onClick={() => handleSubOptionClick('available-tuition')}>Available Tuitions</li>
                <li onClick={() => handleSubOptionClick('applied-tuition')}>Applied Tuitions</li>
         
              </ul>
            )}
          </li>



          <li onClick={() => handleOptionClick("my-profile")}> My Profile</li>

          <li onClick={() => handleOptionClick("my-tuitions")}> Tuitions </li>
          <li onClick={() => handleOptionClick("offers")}> Offers </li>
          <li onClick={() => handleOptionClick("batches")}> Batches </li>
          <li onClick={() => handleOptionClick("demo-lectures")}>
            {" "}
            Demo Lectures{" "}
          </li>
          <li onClick={handleLogoutClick}>
            Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default TutorMenuContainer;
