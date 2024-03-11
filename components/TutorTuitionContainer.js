// import React, { useEffect, useState } from 'react';
// import styles from '../styles/TutorTuitions.module.css';

// const MyTuitions = ({ tutorid }) => {
//   const [tuitions, setTuitions] = useState([]);

//   useEffect(() => {
//     fetchTuitions();
//   }, []);

//   const fetchTuitions = async () => {
//     try {
//       const response = await fetch(`/api/TutorTuitions?tutorId=${tutorid}`);
//       const data = await response.json();
//       setTuitions(data);
//     } catch (error) {
//       console.error('Error fetching tuitions:', error);
//     }
//   };

//   return (
//     <div className={styles.myTuitionsContainer}>
//       <h2 className={styles.myTuitionsHeading}>My Tuitions</h2>
//       {tuitions.map((tuition) => (
//         <div className={styles.tuitionCard} key={tuition.id}>
//           <img className={styles.studentImage} src={tuition.IMAGE} alt={`Student ${tuition.NAME}'s image`} />
//           <p className={styles.studentName}>{tuition.NAME}</p>
//           <p className={styles.studentName}>{tuition.CLASS}</p>
//           <p className={styles.studentName}>{tuition.INSTITUTION}</p>
//           <p className={styles.studentName}>{tuition.ROAD}, {tuition.AREA}</p>
          

//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyTuitions;


import React, { useEffect, useState } from 'react';
import styles from '../styles/TutorTuitions.module.css';

const MyTuitions = ({ tutorid }) => {
  const [tuitions, setTuitions] = useState([]);
  const [selectedTuition, setSelectedTuition] = useState(null);

  useEffect(() => {
    fetchTuitions();
  }, []);

  const fetchTuitions = async () => {
    try {
      const response = await fetch(`/api/TutorTuitions?tutorId=${tutorid}`);
      const data = await response.json();
      // console.log("DATA",data)
      setTuitions(data);
    } catch (error) {
      console.error('Error fetching tuitions:', error);
    }
  };

  const handleTuitionClick = (tuition) => {
    setSelectedTuition(tuition);
  };

  return (
    <div className={styles.myTuitionsContainer}>
      <div className={styles.leftColumn}>
        <h2 className={styles.myTuitionsHeading}>My Tuitions</h2>
        {tuitions.map((tuition) => (
          <div
            className={`${styles.tuitionCard} ${selectedTuition === tuition ? styles.selectedTuition : ''}`}
            key={tuition.id}
            onClick={() => handleTuitionClick(tuition)}
          >
            <img className={styles.studentImage} src={tuition.IMAGE} alt={`Student ${tuition.NAME}'s image`} />
            <p className={styles.studentName}>{tuition.NAME}</p>
            {/* <p className={styles.studentName}>{tuition.CLASS}</p> */}
          </div>
        ))}
      </div>
      <div className={styles.rightColumn}>
        {selectedTuition ? (
          <div className={styles.tuitionDetails}>
            <img className={styles.studentImage} src={selectedTuition.IMAGE} alt={`Student ${selectedTuition.NAME}'s image`} />
            <p className={styles.studentName}>{selectedTuition.NAME}</p>
            <p className={styles.studentName}>{selectedTuition.INSTITUTION}</p>
            <p className={styles.studentName}>{selectedTuition.PHONE_NUMBER}</p>
            <p className={styles.studentName}>{selectedTuition.CLASS}</p>
            <p className={styles.studentName}> {selectedTuition.SUBJECTS}  </p>
            <p className={styles.studentName}>{selectedTuition.ROAD}, {selectedTuition.AREA}</p>
            <p className={styles.studentName}>Tuition type: {selectedTuition.TUITION_TYPE}</p>
            <p className={styles.studentName}>Days per week: {selectedTuition.DAYS_PER_WEEK}</p>
            {/* <p className={styles.studentName}>{selectedTuition.NAME}</p>
            <p className={styles.studentName}>{selectedTuition.NAME}</p> */}
            {/* Add other tuition details */}
            <button className={styles.closeButton} onClick={() => setSelectedTuition(null)}>
            Close
          </button>
          </div>
        ) : (
          <p className={styles.selectTuitionText}>Select a tuition to view details</p>
        )}
      </div>
    </div>
  );
};

export default MyTuitions;


