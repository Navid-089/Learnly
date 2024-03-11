import { useState } from 'react';
// import styles from '../styles/CreateTuition.module.css';

import styles from "../styles/CreateTuition.module.css";
/*TODO FIXME */
const CreateTuitionPost = ({studentId}) => {
  const [salary, setSalary] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [tuitionType, setTuitionType] = useState('online');
  const [tutorGender, setTutorGender] = useState('any');
  const [subject, setSubject] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new tuition post using the state values
    const tuitionPostData = {
      studentId,
      salary,
      subject,
      daysPerWeek,
      tuitionType,
      tutorGender,
    };

    try {
      const response = await fetch('/api/createtuitionpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tuitionPostData),
      });

      if (response.status === 201) {
        setSuccessMessage('Tuition post created successfully.');
        // Reset the form after successful submission
        setSalary('');
        setDaysPerWeek('');
        setSubject('');
        setTuitionType('online');
        setTutorGender('any');
      } else {
        // Handle error case (e.g., show error message)
      }
    } catch (error) {
      console.error('Error creating tuition post:', error);
    }
  };
  const handleCloseSuccessMessage = () => {
    setSuccessMessage(null);
};

  return (
    <div className={styles.container} >
      <h1>Create Tuition Post</h1>
      {successMessage && (<div className={styles['confirmationmodal']}>
                    <p>{successMessage}</p>
                    <button onClick={handleCloseSuccessMessage}>OK</button>
                </div>)}
      <form onSubmit={handleSubmit}  className={styles.formcontainer}>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="daysPerWeek">Days per Week:</label>
          <select id="daysPerWeek" value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
            <option value="6">6</option>
            <option value="7">7</option>

          </select>
        </div>
        <div>
          <label htmlFor="tuitionType">Tuition Type:</label>
          <select id="tuitionType" value={tuitionType} onChange={(e) => setTuitionType(e.target.value)}>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <div>
          <label htmlFor="tutorGender">Tutor Gender:</label>
          <select id="tutorGender" value={tutorGender} onChange={(e) => setTutorGender(e.target.value)}>
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button className={styles.createbtn} type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreateTuitionPost;