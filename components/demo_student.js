import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const DemoLectures = () => {
  const [demoLectures, setDemoLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDemoLectures = async () => {
    try {
      const response = await fetch('/api/getAllDemoLectures');
      const data = await response.json();
      setDemoLectures(data);
    } catch (error) {
      console.error('Error fetching demo lectures:', error);
    }
  };

  useEffect(() => {
    fetchDemoLectures();
  }, []);

  const filteredLectures = demoLectures.filter(
    (lecture) =>
      lecture.TITLE.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.TUTOR_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="demo-lectures-container">
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
              <ReactPlayer url={lecture.LINK} controls={true} width='1200px' height='600px' />

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
