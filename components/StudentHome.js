// components/Home.js
import 'normalize.css';
import { useState, useEffect } from 'react';
import styles from "../styles/StudentHome.module.css";
import { faGraduationCap, faPersonChalkboard, faEnvelope, faEyeSlash, faEye, faUser,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Home({studentId}) {
  const [tutors, setTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    highestSalary: '',
    minExperience: '',
    gender: '',
    availability: '',
  });
  const [selectedTutor, setSelectedTutor] = useState(null); // To hold the selected tutor
  const [showOfferComponent, setShowOfferComponent] = useState(false); // To show/hide the "Offer Tutor" component
  const [subject, setSubject] = useState('');

  useEffect(() => {
    fetchTutors();
  }, []);
  useEffect(() => {
    filterTutors();
  }, [searchTerm, tutors, filterOptions]);

  const fetchTutors = async () => {
    try {
      const response = await fetch('/api/alltutors');
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };
  const filterTutors = () => {
    let filtered = [...tutors];

    if (searchTerm) {
      filtered = filtered.filter((tutor) =>
        tutor.NAME.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterOptions.highestSalary) {
      filtered = filtered.filter(
        (tutor) => tutor.PREFERRED_SALARY <= parseInt(filterOptions.highestSalary)
      );
    }

    if (filterOptions.minExperience) {
      filtered = filtered.filter(
        (tutor) => tutor.YEARS_OF_EXPERIENCE >= parseInt(filterOptions.minExperience)
      );
    }

    if (filterOptions.gender) {
      filtered = filtered.filter(
        (tutor) => tutor.GENDER.toLowerCase() === filterOptions.gender.toLowerCase()
      );
    }

    if (filterOptions.availability) {
      filtered = filtered.filter(
        (tutor) => tutor.AVAILABILITY.toLowerCase() === filterOptions.availability.toLowerCase()
      );
    }

    setFilteredTutors(filtered)
  };
  const handleFilterChange = (filter, value) => {
    let newValue = value;
  
    if (filter === 'highestSalary') {
      newValue = Math.max(0, parseInt(value)); // Ensure non-negative
     // newValue = Math.floor(newValue / 500) * 500; // Round down to the nearest 500
    } else if (filter === 'minExperience') {
      newValue = Math.max(0, parseInt(value)); // Ensure non-negative
    }
  
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [filter]: newValue,
    }));
  };
  const handleTutorClick = (tutor) => {
    setSelectedTutor(tutor);
    setErrorMessage('');
    setShowOfferComponent(false); // Close the "Offer Tutor" component when a tutor is clicked
  };

  const handleBackClick = () => {
    setSelectedTutor(null);
    setShowOfferComponent(false);
    setSubject(''); // Close the "Offer Tutor" component when going back
  };
  const handleOfferClick = () => {
    setShowOfferComponent(true);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleSubmitOffer = async () => {
    const studentUserId = parseInt(studentId); // Replace with actual student user id
    const tutorUserId = selectedTutor.USER_ID;
    const subjects=subject;
  
    try {
      const response = await fetch('/api/offerTutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentUserId,
          tutorUserId,
          subjects,
        }),
      });
  
      if (response.ok) {
        //console.log('Offer successfully sent!');
        // Optionally, you can clear the subject input and close the offer component
        const data=await response.json();
        if(data.message=="Offer successfully sent!"){
          setSubject('');
          setErrorMessage('');
          setShowOfferComponent(false);
        }
        else{
          setErrorMessage('This tutor is already teaching you');
          setSubject('');
        }
        
      } else {
        setErrorMessage('This tutor is already teaching you or you have sent offer already !');
          setSubject('');
        console.error('Error sending offer:', response.status);
      }
    } catch (error) {
      setErrorMessage('This tutor is already teaching you');
          setSubject('');
      console.error('Error sending offer:', error);
    }
  };
  
// className={styles.homecontainer}
// className={styles.filtercontainer}
// className={styles.filterinput}
// className={styles.tutorslist}
// className={styles.tutorcontainer}
// className={styles.image}
// className={styles.searchbar}



  return (
    <div className={styles.homecontainer}>

      <div className={styles.filtercontainer}>

        {selectedTutor ? (
            <div>
              <div className={styles.tutordetails}>
                <h2>Tutor Details</h2>
                <img src={selectedTutor.IMAGE} alt={selectedTutor.NAME} className={styles.image} />
                <p><b>Name:</b> {selectedTutor.NAME}</p>
                <p><b>Years of Experience:</b> {selectedTutor.YEARS_OF_EXPERIENCE}</p>
                <p><b>Preferred Salary:</b> {selectedTutor.PREFERRED_SALARY}</p>
                <p><b>Gender:</b> {selectedTutor.GENDER}</p>
                <p><b>Contact No.:</b> {selectedTutor.PHONE_NUMBER}</p>
                <p><b>Address:</b> {selectedTutor.ROAD},{selectedTutor.AREA},{selectedTutor.CITY}</p>
              </div>
              <div className={styles.tutorbtncontainer}>

                <button className={styles.tutorbackbtn} onClick={handleBackClick}>Back</button>
                <button className={styles.tutorofferbtn} onClick={handleOfferClick}>Offer Tutor</button>

              </div>

            </div>
            
          ) : (
          <div className={styles.filterdetails} >

            <h2>Filter</h2>

            <div>
              <label>Highest Salary:</label>
              <input className={styles.filterinput}
                type="number"
                value={filterOptions.highestSalary}
                onChange={(e) => handleFilterChange('highestSalary', e.target.value)}
              />
            </div>

            <div>
              <label>Min Experience:</label>
              <input 
                className={styles.filterinput}
                type="number"
                value={filterOptions.minExperience}
                onChange={(e) => handleFilterChange('minExperience', e.target.value)}
              />
            </div>

            <div>
              <label>Gender:</label>
              <select
                className={styles.gender}
                value={filterOptions.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label>Availability:</label>
              <select
                className={styles.availability}
                value={filterOptions.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
              >
                <option value="">All</option>
                <option value="yes">Available</option>
                <option value="no">Not Available</option>
              </select>
            </div>

          </div>

          )}
          {showOfferComponent && (

              <div className={styles.offertutorcontainer}>
                <h2>Offer Tutor</h2>
                <input
                   className={styles.offertutorsub}
                  type="text"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={handleSubjectChange}
                />
                {errorMessage && <p>{errorMessage}</p>}
                <button className={styles.offersubmitbtn} onClick={handleSubmitOffer}>Submit</button>
              </div>
            )}

      </div>


      <div className={styles.tutorslist}>

        <div className={styles.searchcontainer} >

          <input
            className={styles.searchbar}
            type="text"
            placeholder="Search by tutor name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchbtn} onClick={filterTutors}> <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>

        </div>

        <div className={styles.tutorlist} >

          {filteredTutors.map((tutor) => (
            <div className={styles.tutorcontainer} key={tutor.USER_ID} 
            onClick={() => handleTutorClick(tutor)}>
              <img src={tutor.IMAGE} alt={tutor.NAME} className={styles.image}/>
              <p>{tutor.NAME}</p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );


}

export default Home;
