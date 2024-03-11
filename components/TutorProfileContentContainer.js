import { useEffect,useState } from "react";
import Link from 'next/link';
import ShowImage from "./showImage";
import UploadForm from "./ProfilePictureForm";
import styles from "../styles/TutorProfile.module.css";

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


const TutorProfileContainer = ({tutorid}) => {
  console.log("tutorid ", tutorid )
  const [selectedOption, setSelectedOption] = useState('my-profile');
  const [tutorDetails, setTutorDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  
  const [editedGender, setEditedGender] = useState('');
  const [editedDateOfBirth, setEditedDateOfBirth] = useState('');
  const [editedArea, setEditedArea] = useState('');
  const [editedCity, setEditedCity] = useState('');
  const [editedRoad, setEditedRoad] = useState('');
  const [editedInstitute, setEditedInstitute] = useState('');
  const [editedFieldOfStudy, setEditedFieldOfStudy] = useState('');
  const [editedDegree, setEditedDegree] = useState('');
  const [editedPassingYear, setEditedPassingYear] = useState('');
  const [editedAvailability, setEditedAvailability] = useState('');
  const [editedSalary, setEditedSalary] = useState('');
  const[editedYearsOfExperience,setEditedYearsOfExperience]=useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const tutorUserId = tutorid; 

  useEffect(() => {
    fetchTutorialDetails();
  }, []);

  const fetchTutorialDetails = async () => {
    try 
    {
      
      const response = await fetch(`/api/tutorprofilecontent?tutorId=${tutorUserId}`);
      const data = await response.json();
      setTutorDetails(data);
      console.log("data",data);

    } catch (error) {
      console.log(error);
    }

  };

  const handleEdit = async () => {

    setEditMode(true);
    setEditedName(tutorDetails.NAME);
    setEditedEmail(tutorDetails.EMAIL);
    setEditedPhoneNumber(tutorDetails.PHONE_NUMBER);
   
    setEditedGender(tutorDetails.GENDER);
    setEditedDateOfBirth(tutorDetails.DATE_OF_BIRTH);
    setEditedArea(tutorDetails.AREA);
    setEditedCity(tutorDetails.CITY);
    setEditedRoad(tutorDetails.ROAD);
    setEditedInstitute(tutorDetails.INSTITUTE);
    setEditedFieldOfStudy(tutorDetails.FIELD_OF_STUDY);
    setEditedDegree(tutorDetails.DEGREE);
    setEditedPassingYear(tutorDetails.PASSING_YEAR);
    setEditedAvailability(tutorDetails.AVAILABILITY);
    setEditedSalary(tutorDetails.PREFERRED_SALARY);
    setEditedYearsOfExperience(tutorDetails.YEARS_OF_EXPERIENCE);
  };


  const handleSave = async () => {
    setEditMode(false);
    const name = editedName;
    const email = editedEmail;
    const phoneNumber = editedPhoneNumber;
    const gender = editedGender;
    const dateOfBirth = editedDateOfBirth;
    const area = editedArea;
    const city = editedCity;
    const road = editedRoad;
    const institute = editedInstitute;
    const fieldOfStudy = editedFieldOfStudy;
    const degree = editedDegree;
    const passingYear = editedPassingYear;
    const availability = editedAvailability;
    const salary = editedSalary;
    const yearsOfExperience = editedYearsOfExperience;

    try 
    {
      const response = await fetch('/api/editTutorProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorUserId,
          name,
          email,
          phoneNumber,
          gender, 
          dateOfBirth,
          area,
          city,
          road,
          institute,
          fieldOfStudy,
          degree,
          passingYear,
          availability,
          salary,
          yearsOfExperience
        }),
      });

      if(response.ok)
      {
        setEditMode(false);
      }
      else
      {
        console.log("Error Occured");
      }
    } catch (error) {
      console.log(error);

    }
    fetchTutorialDetails(); 
  }

  const handleBack = () => {
    setEditMode(false);
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "learnly_preset");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dhtogoc8c/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log(data.secure_url);
    const response = await fetch("/api/upload-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: data.secure_url, id: tutorUserId }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      if (data.message == "Successful") {
        setImageSrc(data.secure_url);
        setUploadData(data);
      } else {
        console.log("Couldn't Upload!");
        setImageSrc("");
        setUploadData("");
      }
    }
    setShowUploadForm(false);
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '10px' }}>
        {tutorDetails ? (
          <div>
            <h2>Tutor Details</h2>
            {editMode ? (
              <div>
                <p>Name: <input type="text" value={editedName} onChange={e => setEditedName(e.target.value)} /></p>
               
                <p>Email: <input type="text" value={editedEmail} onChange={e => setEditedEmail(e.target.value)} /></p>
                <p>Gender: <input type="text" value={editedGender} onChange={e => setEditedGender(e.target.value)} /></p>
                <p>Contact No.: <input type="text" value={editedPhoneNumber} onChange={e => setEditedPhoneNumber(e.target.value)} /></p>
                <p>Date of Birth: <input type="text" value={editedDateOfBirth} onChange={e => setEditedDateOfBirth(e.target.value)} /></p>
                <p>Address: <input type="text" value={editedCity} onChange={e => setEditedCity(e.target.value)} /> <input type="text" value={editedArea} onChange={e => setEditedArea(e.target.value)} /> <input type="text" value={editedRoad} onChange={e => setEditedRoad(e.target.value)} /></p>
                <p>Institution: <input type="text" value={editedInstitute} onChange={e=> setEditedInstitute(e.target.value)} /> </p>
                <p> Field of Study: <input type="text" value={editedFieldOfStudy} onChange={e=> setEditedFieldOfStudy(e.target.value)} /> </p>
                <p> Degree: <input type="text" value={editedDegree} onChange={e=> setEditedDegree(e.target.value)} /> </p>
                <p> Passing Year: <input type="text" value={editedPassingYear} onChange={e=> setEditedPassingYear(e.target.value)} /> </p>  
                <p> Availability: <input type="text" value={editedAvailability} onChange={e=> setEditedAvailability(e.target.value)} /> </p>  
                <p> Preferred Salary: <input type="text" value={editedSalary} onChange={e=> setEditedSalary(e.target.value)} /> </p>  
                <p> Years of Experience: <input type="text" value={editedYearsOfExperience} onChange={e=> setEditedYearsOfExperience(e.target.value)} /> </p> 
                <button onClick={handleSave}>Save</button>
                <button onClick={handleBack}>Back</button>
              </div>
            ) : (
              <div>
                <p>Name: {tutorDetails.NAME}</p>
                <p>Email: {tutorDetails.EMAIL}</p>
                <p>Gender: {tutorDetails.GENDER}</p>
                <p>Contact.No: {tutorDetails.PHONE_NUMBER}</p>
                <p>Date of Birth:  {formatDate(tutorDetails.DATE_OF_BIRTH)}</p>
                <p>Address: {tutorDetails.ROAD},{tutorDetails.AREA},{tutorDetails.CITY}</p>
                <p>Institution: {tutorDetails.INSTITUTE}</p>
                <p>Field of Study: {tutorDetails.FIELD_OF_STUDY}</p>
                <p>Degree: {tutorDetails.DEGREE}</p>
                <p>Passing Year: {tutorDetails.PASSING_YEAR}</p>
                <p>Availability: {tutorDetails.AVAILABILITY}</p>
                <p>Preferred Salary: {tutorDetails.PREFERRED_SALARY}</p>
                <p>Years of Experience: {tutorDetails.YEARS_OF_EXPERIENCE}</p>
                <button onClick={handleEdit}>Edit</button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading Tutor details...</p>
        )}
      <div>
        <div>
          {showUploadForm ? (
            // <ProfilePictureForm studentId={studentId}/> 
            <div className={styles.container}>
              <main className={styles.main}>
                <h1 className={styles.heading}>UPLOAD YOUR IMAGE</h1>

                <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
                  <p>
                    <input type="file" name="file" className={styles.inputt} />
                  </p>

                  <img
                    src={imageSrc}
                    alt="Preview will apprear here."
                    className={styles.previewImage}
                  />

                  {imageSrc && !uploadData && (
                    <p>
                      <button className={styles.uploadButton}>Upload Files</button>
                    </p>
                  )}

                  {uploadData && <p> Uploaded Successfully! </p>}
                </form>
              </main>
            </div>
          ) : (
            <ShowImage tutorid={tutorUserId} />
          )}
        </div>
        <button onClick={() => setShowUploadForm(!showUploadForm)}>Change Profile Picture</button>
      </div>
    </div>
  </div>
   
  );
};

export default TutorProfileContainer;










