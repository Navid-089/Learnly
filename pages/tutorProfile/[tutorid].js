import React, { useState } from 'react';
import Link from 'next/link';

import styles from '../../styles/Profile.module.css';
import { useRouter } from 'next/router';
import TutorMenuContainer from '../../components/TutorMenuContainer';
import TutorContentContainer from '../../components/TutorContentContainer';

const tutorProfile = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedOption, setSelectedOption] = useState('my-profile');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router=useRouter();
  const id=router.query.tutorid;

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.profilepage}>
      <h1>tutor {id} Profile Page</h1>
      <TutorMenuContainer onSelectOption={handleSelectOption} />
      <TutorContentContainer selectedOption={selectedOption} tutorid={id}/>
    </div>
  );
};

export default tutorProfile;

