// import { closeDatabaseConnection, connectToDatabase, queryDatabase } from "@/utils/database";

// /*async function getDatabaseData() {
//     await connectToDatabase();
//     const cursor = await queryDatabase(`BEGIN
//                                          GET_SUBJECTS(:cursor); END;`);
//      // Assuming you have an 'ID' column
//      console.log(cursor);
//     return cursor;
//  }*/
//  async function getDatabaseData() {
//     await connectToDatabase();

//     const cursor = await queryDatabase(`
//       BEGIN
//         GET_SUBJECTS(:cursor);
//       END;
//     `);

//     const resultSet = await cursor.getRows();
//     await cursor.close();

//     return resultSet;
//   }

// function Home({ articles }) {
//   return (
//     <>
//     <h1>List of STUDENTS</h1>
//     {

//         articles.map((article )=> {
//             return(
//                 <div key={article.NAME}>
//                     <h2>
//                         {article.NAME}
//                     </h2>
//                 </div>
//             )
//          })

//     }
//     </>
//   );
// }

// export default Home

// export async function getServerSideProps() {
//     const articles = await getDatabaseData();
//     await closeDatabaseConnection(); // Close the connection when done
//     return {
//       props: {
//         articles,
//       },
//     };
//   }

// import React, { useState } from 'react';

// function Home() {
//   const [studentId, setStudentId] = useState('');
//   const [inputId, setInputId] = useState('');

//   const executeFunction = async () => {
//     try {
//       const response = await fetch('/api/findStudent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: inputId }),
//       });

//       const data = await response.json();
//       setStudentId(data.studentId);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter ID"
//         value={inputId}
//         onChange={(e) => setInputId(e.target.value)}
//       />
//       <button onClick={executeFunction}>Find Student</button>
//       {studentId && <p>Student ID: {studentId}</p>}
//     </div>
//   );
// }

// export default Home;
import React from "react";
import { useRouter } from "next/router"; // Import the useRouter hook
import styles from "../styles/Home.module.css";

const Home = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const handleLoginClick = () => {
    //console.log('hello');
    router.push("/login");
    // Navigate to the login page
  };

  const handleSignupClick = () => {
    router.push("/signup"); // Navigate to the signup page
  };

  return (
    
    <div className={styles.container}>
      <div className={styles.bgcontainer}></div>
      
      <header className={styles.header}>
        <img src="/LogoDark.png" alt="Image" />
      </header>
      <main className={styles.main}>
        <div className={styles.left}>
          <img src="/Main_img.png" alt="Image" />
        </div>
        <div className={styles.right}>
          <h1>Enhancing your potential and bringing out the best in you</h1>
          <p>Join us on the journey to find the perfect tutor for you</p>
          <div className={styles.btn}>
            <button className={styles.button1} onClick={handleLoginClick}>
              Login
            </button>
            <button className={styles.button2} onClick={handleSignupClick}>
              Signup
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
