import React, { useEffect, useState } from 'react';
import styles from '../styles/AppliedTuitionPosts.module.css';




const imageStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  };

function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


function AppliedTuitionPostsContainer({ tutorid }) {
  const [appliedPosts, setAppliedPosts] = useState([]);
    const tutor_id = parseInt(tutorid);
    // console.log('tutor_id', tutor_id);
  useEffect(() => {
    fetchAppliedPosts();
  }, []);

  const fetchAppliedPosts = async () => {
    try {
      const response = await fetch(`/api/AppliedTuitionPosts?tutorId=${tutor_id}`);
      const data = await response.json();
      console.log("DATA",data)
      setAppliedPosts(data);
      console.log("Applied posts -----",appliedPosts);
    } catch (error) {

      console.error('Error fetching applied posts:', error);
    }
  };

  const handleCancelApplication = async (postId) => {
    try {
      const response = await fetch(`/api/CancelApplication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, tutor_id }),
      });
      const data = await response.json();
      console.log(data);
      fetchAppliedPosts();
    } catch (error) {
      console.error('Error cancelling application:', error);
    }
  };

  return (
    <div className={styles.appliedTuitionPostsContainer}>
      <h2>Applied Tuition Posts</h2>
      {appliedPosts.map((post) => (
        <div className={styles.postCard} key={post.POST_ID}>
           <img src={post.IMAGE} style={imageStyle}  alt="Student Image" />
    <p> {(post.NAME)}  </p>
    <p> {(post.CLASS)} || {(post.INSTITUTION)}</p>
    {/* <p> Subjects: {cap(post.SUBJECTS)}</p> */}

    {/* If subject isn't blank, it will print the subjects. Other wise, it'll print not specified */}
    <p> Subjects: {post.SUBJECTS ? (post.SUBJECTS) : 'Not Specified'}</p>
    <p> Tuiiton Type: {(post.TUITION_TYPE)}</p>
    <p> Salary : {post.SALARY}</p>

    <p> Location: {(post.ROAD)},{(post.AREA)},{(post.CITY)}</p>
    {post.NOTE ? <p> Note: {(post.NOTE)}</p> : null}
   
          <button className={styles.cancelButton} onClick={() => handleCancelApplication(post.POST_ID)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}

export default AppliedTuitionPostsContainer;
