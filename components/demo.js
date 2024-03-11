import { useState,useEffect } from "react";
import React from 'react'
import ReactPlayer from 'react-player'


const DemoLectures = ({tutorid}) => {
    const [title, setTitle] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [demoLectures, setDemoLectures] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

   

      const fetchDemoLectures = async () => {
        try {
          const response = await fetch('/api/getAllDemoLectures');
          const data = await response.json();
          console.log(data);
          setDemoLectures(data);
        } catch (error) {
          console.error('Error fetching demo lectures:', error);
        }
      };

      useEffect(() => {
        fetchDemoLectures();
      }, []);

      const handleAddLecture = async (e) => {
        e.preventDefault();

        const demodata = 
        {
            tutorid,
            title,
            videoLink

        }
        console.log(demodata);
        try {
            const response = await fetch('/api/addDemoLecture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(demodata),
            });

            const data = await response.json();
            console.log(data);
            if (data.success == true) {
                setSuccessMessage('Demo Lecture Added Successfully');
                fetchDemoLectures();
                
                
            } else {
                setSuccessMessage('Error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setTitle('');
        setVideoLink('');
       
        
      };

      const handleCloseSuccessMessage = () => {
        setSuccessMessage('');
        };

    


      const filteredLectures = demoLectures.filter(
        (lecture) =>
          lecture.TITLE.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lecture.TUTOR_NAME.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <div className="demo-lectures-container">
          <div className="add-lecture-form">
            <h2>Add Demo Lecture</h2>
            {successMessage && (<div className='confirm-modal'>
                    <p>{successMessage}</p>
                    <button onClick={handleCloseSuccessMessage}>OK</button>
                </div>)}
            <form onSubmit={handleAddLecture}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Video Link"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                required
              />
              <button type="submit">Add Lecture</button>
            </form>
          </div>
          <div className="demo-lectures-list">
            <h2>Demo Lectures List</h2>
            <input
              type="text"
              placeholder="Search by Title or Tutor Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="lecture-columns">
              {filteredLectures.map((lecture) => (
                <div key={lecture.LINK} className="lecture-box">
                  {/* Embed video using iframe */}
                    <div> 
                    <ReactPlayer url={lecture.LINK} controls={true} width='1200px' height='600px'/>

                    </div>

                  <p> UPLOADER: {lecture.TUTOR_NAME}</p>
                  <p> TITLED: {lecture.TITLE}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

export default DemoLectures;
      



