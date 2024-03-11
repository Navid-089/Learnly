import { useState, useEffect } from 'react';

const TuitionPostsContainerStyle = {
  display: "flex",
};

const filterContainerStyle = {
  flex: 1,
  padding: "20px",
  borderRight: "1px solid #ccc",
  position: "sticky",
  top: 0,
  height: "80vh",
  overflowY: "auto",
};

const postsContainerStyle = {
  flex: 4,

  padding: "20px",
  height: "80vh",
  overflowY: "auto",
};



const filterInputStyle = {
  width: "90%",
  padding: "10px",
  
  marginBottom: "10px",
};

const tuitionPostsListStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridGap: "20px",
};

const PostsContainerStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  
  boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
};

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

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDateandTime(timestamp)
{
  const date = new Date(timestamp);
    return date.toLocaleString(); // Modify the format as needed
}







const imageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
};

function TuitionPosts({ tutorid }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  //const [searchTerm, setSearchTerm] = useState('');
  // const [appliedPosts, setAppliedPosts] = useState([]); 
  const [filterOptions, setFilterOptions] = useState({
    minSalary: '',
    tuition_type: '',
    availability: 'available',
    gender: '',
    subject: '', 
  });

  const [sortBy, setSortBy] = useState(null); 
const [sortOrder, setSortOrder] = useState('desc');

  

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  // useEffect(() => {
  //   filterPosts();
  // }, [ posts, filterOptions]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/allposts?tutorId=${tutorid}`);
      const data = await response.json();

      // const appliedResponse = await fetch(`/api/appliedposts?tutorId=${tutorid}`);
      // const appliedData = await appliedResponse.json();
      // console.log(appliedData);
      setPosts(data);
      // setAppliedPosts(appliedData );
      // console.log("data",posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {

    setFilteredPosts(posts);

  let filtered = [...posts];

  if (sortBy === 'salary') {
    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.SALARY - b.SALARY;
      } else {
        return b.SALARY - a.SALARY;
      }
    });
  } else if (sortBy === 'date') {
    filtered.sort((a, b) => {
      const dateA = new Date(a.TIMESTAMP);
      const dateB = new Date(b.TIMESTAMP);

      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }

  if (filterOptions.minSalary) {
    filtered = filtered.filter(
      (tuition) =>
        tuition.SALARY >= parseInt(filterOptions.minSalary)
    );
  }

  if (filterOptions.tuition_type) {
    filtered = filtered.filter(
      (tuition) =>
        tuition.TUITION_TYPE.toLowerCase() ===
        filterOptions.tuition_type.toLowerCase()
    );
  }

  if(filterOptions.availability){
    filtered = filtered.filter(
      (tuition) =>
        tuition.STATUS.toLowerCase() ===
        filterOptions.availability.toLowerCase()
    );
  }

  if(filterOptions.gender)
  {
    filtered = filtered.filter(
      (tuition) =>
        tuition.GENDER.toLowerCase() ===
        filterOptions.gender.toLowerCase()
    );
  }

  if (filterOptions.subject) {
    const subjectFilter = filterOptions.subject.toLowerCase();
    filtered = filtered.filter((tuition) =>
      tuition.SUBJECTS && tuition.SUBJECTS.toLowerCase().includes(subjectFilter)
    );
  }
  




  // filtered = filtered.map((tuition) => ({
  //   ...tuition,
  //   applied: appliedPosts.some(appliedPost => appliedPost.POST_ID === tuition.POST_ID)
  // }));

  setFilteredPosts(filtered);
}, [posts, filterOptions, sortBy, sortOrder]);




  const handleFilterChange = (filter, value) => {
    let newValue = value;

    if (filter === "minSalary") {
      newValue = Math.max(0, parseInt(value));
    }

    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [filter]: newValue,
    }));
  };

  const handlePostClick = (tuition) => {
    setSelectedPost(tuition);
  };

  const handleApply = async (tuition) => {
    // setSelectedPost(tuition);
    const tutorId = parseInt(tutorid);
    const postId = tuition.POST_ID;
    console.log("selectedpostID -- ", postId);

    try {
      const response = await fetch("/api/tutorapply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tutorId, postId }),
      });

      const data = await response.json();

      const updatedFilteredPosts = filteredPosts.filter(
        (post) => post.POST_ID !== tuition.POST_ID
      );

      setFilteredPosts(updatedFilteredPosts);


      // console.log(data);
    } catch (error) {
      console.error("Error applying:", error);
    }
  };

  return (
    <div style={TuitionPostsContainerStyle} className="tuitionposts-container">
      <div style={filterContainerStyle} className="filter-container">
        <div>
          <h2>Filter</h2>
          <div>
            <label> Minimum Salary: </label>
            <input
              style={filterInputStyle}
              type="number"
              value={filterOptions.minSalary}
              onChange={(e) => handleFilterChange('minSalary', e.target.value)}
            />
          </div>
          <div>
            <label> Tuition Type: </label>
            <select
              value={filterOptions.tuition_type}
              onChange={(e) =>
                handleFilterChange('tuition_type', e.target.value)
              }
            >
              <option value="">All</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div>
            <label> Preferred Gender: </label>
            <select
              value={filterOptions.gender}
              onChange={(e) =>
                handleFilterChange('gender', e.target.value)
              }
            >
              <option value="">All</option>
               <option value="Male"> Male </option>
               <option value="Female"> Female </option>
            </select>
          </div>
          
          <div>
          <label> Subjects: </label>
            <input
              style={filterInputStyle}
              type="text"
              value={filterOptions.subject}
              onChange={(e) => handleFilterChange('subject', e.target.value)}
            />
          </div>

          <div>
  <h2>Sort By</h2>
  <div>
    <label>Sort By:</label>
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="">None</option>
      <option value="salary">Salary</option>
      <option value="date">Posted Date</option>
    </select>
  </div>
  {sortBy && (
    <div>
      <label>Sort Order:</label>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  )}
</div>

         
        </div>
      </div>

      <div className="posts-container" style={postsContainerStyle} >
        <div>
          <h2>Posts</h2>
          <div className="tuitionposts-list" style={tuitionPostsListStyle} >
          {filteredPosts.map((tuition) => (
  <div
    className="post-container"
    style={PostsContainerStyle}
    key={tuition.POST_ID}
    onClick={() => handlePostClick(tuition)}
  >
    {/* <p> {tuition.TUITION_TYPE}</p> */}
    <p> <h3> POSTED ON {formatDateandTime(tuition.TIMESTAMP)} </h3></p>
    <img src={tuition.IMAGE} style={imageStyle} alt="Student Image" />
    <p> {cap(tuition.NAME)}  </p>
    <p> {cap(tuition.CLASS)} || {cap(tuition.INSTITUTION)}</p>
    
    {/* <p> Subjects: {cap(tuition.SUBJECTS)}</p> */}

    {/* If subject isn't blank, it will print the subjects. Other wise, it'll print not specified */}
    <p> Subjects: {tuition.SUBJECTS ? cap(tuition.SUBJECTS) : 'Not Specified'}</p>
    <p> {cap(tuition.TUITION_TYPE)}</p>
    <p> Salary : {tuition.SALARY}</p>
    <p> Preferred Gender: {tuition.TUTOR_GENDER}</p>

    <p> Location: {cap(tuition.ROAD)},{cap(tuition.AREA)},{cap(tuition.CITY)}</p>
    {tuition.NOTE ? <p> Note: {cap(tuition.NOTE)}</p> : null}
   
    
    
      <button onClick={() => handleApply(tuition)}>Apply</button>
   
  </div>
))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TuitionPosts;
