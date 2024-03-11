import React, { useState } from 'react';
import Link from 'next/link';
// import MenuContainer from '../components/MenuContainer';
// import MenuContainer from '@/components/StudentMenuContainer.js';
// import ContentContainer from '@/components/ContentContainer';
// import styles from "@/styles/Profile.module.css";

import MenuContainer from '../../components/StudentMenuContainer';
import ContentContainer from '../../components/StudentContentContainer';
import styles from '../../styles/Profile.module.css';

import { useRouter } from 'next/router';

const StudentProfile = () => {
  const [selectedOption, setSelectedOption] = useState('my-profile');
  const router=useRouter();
  const id=router.query.studentid;

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.profilepage}>
      {/* <h1>Student {id} Profile Page</h1> */}
      <MenuContainer onSelectOption={handleSelectOption} />
      <ContentContainer selectedOption={selectedOption} studentId={id} />
    </div>
  );
};

export default StudentProfile;

