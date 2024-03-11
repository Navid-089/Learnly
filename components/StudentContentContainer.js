import React from 'react';
import styles from "../styles/Content.module.css";
// import ProfileContentContainer from './StudentProfileContentContainer';
// import StudentHome from './StudentHome';
// import EnrolledBatches from './EnrolledBatches';
// import AllBatches from './AllBatches';
// import CreateTuitionPost from './CreatTuitionPost';

import ProfileContentContainer from "./StudentProfileContentContainer";
import StudentHome from "./StudentHome";
import EnrolledBatches from "./EnrolledBatches";
import AllBatches from "./AllBatches";
import CreateTuitionPost from "./CreatTuitionPost";


const ContentContainer = ({ selectedOption,studentId }) => {
  let content;
  console.log(studentId);

  switch (selectedOption) {
    case 'home':
      //content = <div>Tutors Content</div>;
      return <div><StudentHome studentId={studentId}/></div>;
      break;
    case 'my-profile':
      //content = <div>My Profile Content</div>;
      return <div><ProfileContentContainer studentId={studentId}/></div>;
      // <ProfileContentContainer/>
      break;
    case 'my-tutors':
      //content = <div>Tutors Content</div>;
      //return <div ><MyTutorContainer studentId={studentId}/></div>;
      break;
    case 'enrolled-batches':
        //content = <div>Tutors Content</div>;
      return <div><EnrolledBatches studentId={studentId}/></div>;
      break;
    case 'all-batches' :
      return <div><AllBatches studentId={studentId}/></div>;
      break;
    case 'request-tutor':
        //content = <div>Tutors Content</div>;
      return <div><CreateTuitionPost studentId={studentId}/></div>;
      break;
    case 'post_request':
        //content = <div>Tutors Content</div>;
      return <div><AllBatches studentId={studentId}/></div>;
      break;
    case 'handle_request':
        //content = <div>Tutors Content</div>;
      return <div className={styles.tutorcontentcontainer}>Request</div>;
      break;
    case 'demo-lectures':
        //content = <div>Tutors Content</div>;
      return <div className={styles.tutorcontentcontainer}>Demo lectures</div>;
      break;
    default:
      //content = <div>Default Content</div>;
      return <div className={styles.contentcontainer}>default contect</div>;
  }

 // return <div className={styles.contentcontainer}>{content}</div>;
};

export default ContentContainer;
