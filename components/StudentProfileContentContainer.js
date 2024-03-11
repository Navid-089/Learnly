// components/ProfileContentContainer.js
import 'normalize.css';
import { useEffect, useState } from 'react';
import styles from "../styles/StudentProfile.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import ProfilePictureForm from "./ProfilePictureForm";
import ShowImage from './showimage_student';
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth(); // Months are zero-based
  const year = date.getFullYear();
  
  const monthsAbbrev = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL',
    'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];
  
  const formattedDate = `${day} ${monthsAbbrev[month]} ${year}`;
  return formattedDate;
}

const ProfileContentContainer = ({ studentId }) => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedClass, setEditedClass] = useState('');
  const [editedInstitution, setEditedInstitution] = useState('');
  const [editedGender, setEditedGender] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [editedDateOfBirth, setEditedDateOfBirth] = useState('');
  const [editedArea, setEditedArea] = useState('');
  const [editedCity, setEditedCity] = useState('');
  const [editedRoad, setEditedRoad] = useState('');
  const [showUploadForm,setShowUploadForm] = useState(false);
  const studentUserId = studentId;

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch(`/api/profilecontent?studentId=${studentUserId}`);

      const data = await response.json();
      setStudentDetails(data);
      //console.log()
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleEditClick = async () => {
    
    setEditMode(true);
    setEditedName(studentDetails.NAME);
    setEditedEmail(studentDetails.EMAIL);
    setEditedClass(studentDetails.CLASS);
    setEditedInstitution(studentDetails.INSTITUTION);
    setEditedGender(studentDetails.GENDER);
    setEditedPhoneNumber(studentDetails.PHONE_NUMBER);
    setEditedDateOfBirth(studentDetails.DATE_OF_BIRTH);
    setEditedCity(studentDetails.CITY);
    setEditedArea(studentDetails.AREA);
    setEditedRoad(studentDetails.ROAD);
  };

  // const handleSaveClick = () => {
  //   setEditMode(false);

  //   fetchStudentDetails();
  //   setStudentDetails({
  //     ...studentDetails,
  //     NAME: editedName,
  //     EMAIL: editedEmail,
  //     CLASS: editedClass,
  //     INSTITUTION: editedInstitution,
  //     GENDER: editedGender,
  //     PHONENUMBER: editedPhoneNumber,
  //     DATEOFBIRTH: editedDateOfBirth,
  //     CITY: editedCity,
  //     AREA: editedArea,
  //     ROAD: editedRoad,
  //   });
  // };
  const handleSaveClick = async () => {
    setEditMode(false);
    const name= editedName;
    const email = editedEmail;
    const s_class = editedClass;
    const institution = editedInstitution;
    const gender = editedGender;
    const phone_number = editedPhoneNumber;
    const date_of_birth = editedDateOfBirth;
    const city = editedCity;
    const area = editedArea;
    const road = editedRoad;
    try {
      const response = await fetch('/api/editProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentUserId,
          name,
          email,
          s_class,
          institution,
          gender,
          phone_number,
          date_of_birth,
          city,
          area,
          road,
        }),
      });
  
      if (response.ok) {
        //console.log('Offer successfully sent!');
        // Optionally, you can clear the subject input and close the offer component
        setEditMode(false);
      } else {
        console.error('Error editing profile :', response.status);
      }
    } catch (error) {
      console.error('Error editing profile:', error);
    }
    fetchStudentDetails();
  };
  
  const handleBackClick = () => {
    setEditMode(false);
  };

  return (
    <div className={styles.container}>
      {studentDetails ? (
        <div className={styles.studentdetails}>
          <h2>Student Details</h2>
          {editMode ? (
            <div className={styles.studentedit} >
              <p>Name: <input type="text" value={editedName} onChange={e => setEditedName(e.target.value)} /></p>
              <p>Email: <input type="text" value={editedEmail} onChange={e => setEditedEmail(e.target.value)} /></p>
              <p>Class: <input type="text" value={editedClass} onChange={e => setEditedClass(e.target.value)} /></p>
              <p>Institution: <input type="text" value={editedInstitution} onChange={e => setEditedInstitution(e.target.value)} /></p>
              <p>Gender: <input type="text" value={editedGender} onChange={e => setEditedGender(e.target.value)} /></p>
              <p>Phone Number: <input type="text" value={editedPhoneNumber} onChange={e => setEditedPhoneNumber(e.target.value)} /></p>
              <p>Date of Birth: <input type="text" value={editedDateOfBirth} onChange={e => setEditedDateOfBirth(e.target.value)} /></p>
              <p>Address: <input type="text" value={editedCity} onChange={e => setEditedCity(e.target.value)} /> <input type="text" value={editedArea} onChange={e => setEditedArea(e.target.value)} /> <input type="text" value={editedRoad} onChange={e => setEditedRoad(e.target.value)} /></p>

              <div className={styles.btncontainer}>
              <button className={styles.savebtn} onClick={handleSaveClick}>Save</button>
              <button className={styles.backbtn} onClick={handleBackClick}>Back</button>
              </div>

            </div>
          ) : (
            <div>
              <p>Name: {studentDetails.NAME}</p>
              <p>Class: {studentDetails.CLASS}</p>
              <p>Institution: {studentDetails.INSTITUTION}</p>
              <p>Email: {studentDetails.EMAIL}</p>
              <p>Address: {studentDetails.ROAD},{studentDetails.AREA},{studentDetails.CITY}</p>
              <p>Gender: {studentDetails.GENDER}</p>
              <p>Contact.No: {studentDetails.PHONE_NUMBER}</p>
              <p>Date of Birth:  {formatDate(studentDetails.DATE_OF_BIRTH)}</p>
              {/* <div><ProfilePictureForm studentId={studentId}/></div> */}

              <button className={styles.editbtn} onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading student details...</p>
      )}
      <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          {showUploadForm ? (
            <ProfilePictureForm studentId={studentId}/> 
          ) : (
            <ShowImage studentid={studentId} />
          )}
        </div>
        <button onClick={() => setShowUploadForm(!showUploadForm)}>Change Profile Picture</button>
      </div>
    </div>
  );
};

export default ProfileContentContainer;
