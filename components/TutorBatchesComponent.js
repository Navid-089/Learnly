// import { useState, useEffect } from 'react';

// const batchContainerStyle = {
//   display: "flex",
//   flexWrap: "wrap",
//   justifyContent: "center", 
// };

// const batchStyle = {
//   border: "1px solid #ccc",
//   padding: "20px",
//   margin: "20px",
//   width: "300px",
//   borderRadius: "8px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
//   background: "#ffffff",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// };

// const headerStyle = {
//   fontSize: "1.5rem",
//   marginBottom: "10px",
// };

// const detailStyle = {
//   fontSize: "1rem",
//   marginBottom: "5px",
// };

// const BatchesContainer = ({ tutorid }) => {
//   const [batches, setBatches] = useState([]);

//   useEffect(() => {
//     fetchBatches();
//   }, []);

//   const fetchBatches = async () => {
//     try {
//       const response = await fetch(`/api/tutorbatchcontent?tutorId=${tutorid}`);
//       const data = await response.json();
//       console.log("data", data);
//       setBatches(data);
//     } catch (error) {
//       console.error("Error fetching batches:", error);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Batches</h2>
//       <div style={batchContainerStyle}>
//         {batches.map((batch) => (
//           <div key={batch.BATCH_ID} style={batchStyle}>
//             <h3 style={headerStyle}>Class {batch.BATCH_CLASS}</h3>
//             <p style={detailStyle}>Class Time: {batch.CLASS_TIME}</p>
//             <p style={detailStyle}>Subject: {batch.SUBJECT}</p>
//             <p style={detailStyle}>Days Per Week: {batch.DAYS_PER_WEEK}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BatchesContainer;

// import { useState, useEffect } from 'react';

// const batchContainerStyle = {
//   display: "flex",
//   flexWrap: "wrap",
//   justifyContent: "center",
// };

// const batchStyle = {
//   border: "1px solid #ccc",
//   padding: "20px",
//   margin: "20px",
//   width: "300px",
//   borderRadius: "8px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//   background: "#ffffff",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// };

// const headerStyle = {
//   fontSize: "1.5rem",
//   marginBottom: "10px",
// };

// const detailStyle = {
//   fontSize: "1rem",
//   marginBottom: "5px",
// };

// const BatchesContainer = ({ tutorid }) => {
//   const [batches, setBatches] = useState([]);
//   const [newBatchInfo, setNewBatchInfo] = useState({
//     classTime: '',
//     subject: '',
//     daysPerWeek: '',
//     s_class:'',
//   });

//   useEffect(() => {
//     fetchBatches();
//   }, []);

//   const fetchBatches = async () => {
//     try {
//       const response = await fetch(`/api/tutorbatchcontent?tutorId=${tutorid}`);
//       const data = await response.json();
//       console.log("data", data);
//       setBatches(data);
//     } catch (error) {
//       console.error("Error fetching batches:", error);
//     }
//   };

//   const handleCreateBatch = async (e) => {
//     e.preventDefault();
    
    
//     const batchdata = 

//     {
//       tutorid: parseInt(tutorid),
//       s_class: newBatchInfo.s_class, 
//       subject: newBatchInfo.subject,
//       daysPerWeek: parseInt(newBatchInfo.daysPerWeek),
//       classTime: newBatchInfo.classTime,
//     }

//     console.log(batchdata);

//     try {
//       const response = await fetch('/api/addBatch', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(batchdata),
//       });

//       const data = await response.json();
//       console.log(data);
//       if (data.success == true) {
//         // setSuccessMessage('Batch Added Successfully');
//         fetchBatches();

//       } 
//       else {
//         // setSuccessMessage('Error');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     setNewBatchInfo({
//       classTime: '',
//       subject: '',
//       daysPerWeek: '',
//       s_class: '',
//     });
    
//     fetchBatches();
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ flex: 1, padding: "20px" }}>
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Batches</h2>
//         <div style={batchContainerStyle}>
//           {batches.map((batch) => (
//             <div key={batch.BATCH_ID} style={batchStyle}>
//               <h3 style={headerStyle}>Class {batch.BATCH_CLASS}</h3>
//               <p style={detailStyle}>Class Time: {batch.CLASS_TIME}</p>
//               <p style={detailStyle}>Subject: {batch.SUBJECT}</p>
//               <p style={detailStyle}>Days Per Week: {batch.DAYS_PER_WEEK}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div style={{ flex: 1, padding: "20px" }}>
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Batch</h2>
//         <form onSubmit={handleCreateBatch} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//   <input
//     type="text"
//     placeholder="s_class"
//     value={newBatchInfo.s_class}
//     onChange={(e) => setNewBatchInfo({ ...newBatchInfo, s_class: e.target.value })}
//     required
//     style={{ width: "200px", marginBottom: "10px" }}
//   />
//   <input
//     type="text"
//     placeholder="Class Time"
//     value={newBatchInfo.classTime}
//     onChange={(e) => setNewBatchInfo({ ...newBatchInfo, classTime: e.target.value })}
//     required
//     style={{ width: "200px", marginBottom: "10px" }}
//   />
//   <input
//     type="text"
//     placeholder="Subject"
//     value={newBatchInfo.subject}
//     onChange={(e) => setNewBatchInfo({ ...newBatchInfo, subject: e.target.value })}
//     required
//     style={{ width: "200px", marginBottom: "10px" }}
//   />
//   <input
//     type="text"
//     placeholder="Days Per Week"
//     value={newBatchInfo.daysPerWeek}
//     onChange={(e) => setNewBatchInfo({ ...newBatchInfo, daysPerWeek: e.target.value })}
//     required
//     style={{ width: "200px", marginBottom: "10px" }}
//   />
//   <button type="submit" style={{ width: "200px", marginBottom: "10px", margin: "0 auto" }}>Create Batch</button>
// </form>


//       </div>
//     </div>
//   );
// }

// export default BatchesContainer;

import { useState, useEffect } from 'react';

const batchContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const batchStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  margin: "20px",
  width: "300px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  background: "#ffffff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headerStyle = {
  fontSize: "1.5rem",
  marginBottom: "10px",
};

const detailStyle = {
  fontSize: "1rem",
  marginBottom: "5px",
};

const BatchesContainer = ({ tutorid }) => {
  const [batches, setBatches] = useState([]);
  const [newBatchInfo, setNewBatchInfo] = useState({
    classTime: '',
    subject: '',
    daysPerWeek: '',
    s_class:'',
  });

  const [selectedBatch, setSelectedBatch] = useState(null); 
  const [students, setStudents] = useState([]); 
  const [showAddBatch, setShowAddBatch] = useState(true); 
  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await fetch(`/api/tutorbatchcontent?tutorId=${tutorid}`);
      const data = await response.json();
      console.log("data", data);
      setBatches(data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const handleCreateBatch = async (e) => {
    e.preventDefault();
    
    
    const batchdata = 

    {
      tutorid: parseInt(tutorid),
      s_class: newBatchInfo.s_class, 
      subject: newBatchInfo.subject,
      daysPerWeek: parseInt(newBatchInfo.daysPerWeek),
      classTime: newBatchInfo.classTime,
    }

    console.log("batchdata", batchdata);

    try {
      const response = await fetch('/api/addBatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchdata),
      });

      const data = await response.json();
      console.log(data);
      if (data.success == true) {
        // setSuccessMessage('Batch Added Successfully');
        fetchBatches();

      } 
      else {
        // setSuccessMessage('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setNewBatchInfo({
      classTime: '',
      subject: '',
      daysPerWeek: '',
      s_class: '',
    });
    
    fetchBatches();
  };

  const handleBatchClick = async (batch) => {
    
    try {
      const response = await fetch(`/api/getStudentsForBatch?batchid=${batch.BATCH_ID}`);
      const data = await response.json();
      console.log("DATA HERE :");
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }

    setSelectedBatch(batch);
    setShowAddBatch(false);
  };

  const handleBackClick = () => {
    setSelectedBatch(null);
    setShowAddBatch(true);
  };



  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Batches</h2>
        <div style={batchContainerStyle}>
          {batches.map((batch) => (
            <div key={batch.BATCH_ID} style={batchStyle} onClick={() => handleBatchClick(batch)} >
              <h3 style={headerStyle}>Class {batch.BATCH_CLASS}</h3>
              <p style={detailStyle}>Class Time: {batch.CLASS_TIME}</p>
              <p style={detailStyle}>Subject: {batch.SUBJECT}</p>
              <p style={detailStyle}>Days Per Week: {batch.DAYS_PER_WEEK}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>

      {showAddBatch && (
          <>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Batch</h2>
        <form onSubmit={handleCreateBatch} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <input
    type="text"
    placeholder="Student Class"
    value={newBatchInfo.s_class}
    onChange={(e) => setNewBatchInfo({ ...newBatchInfo, s_class: e.target.value })}
    required
    style={{ width: "200px", marginBottom: "10px" }}
  />
  <input
    type="text"
    placeholder="Class Time"
    value={newBatchInfo.classTime}
    onChange={(e) => setNewBatchInfo({ ...newBatchInfo, classTime: e.target.value })}
    required
    style={{ width: "200px", marginBottom: "10px" }}
  />
  <input
    type="text"
    placeholder="Subject"
    value={newBatchInfo.subject}
    onChange={(e) => setNewBatchInfo({ ...newBatchInfo, subject: e.target.value })}
    required
    style={{ width: "200px", marginBottom: "10px" }}
  />
  <input
    type="text"
    placeholder="Days Per Week"
    value={newBatchInfo.daysPerWeek}
    onChange={(e) => setNewBatchInfo({ ...newBatchInfo, daysPerWeek: e.target.value })}
    required
    style={{ width: "200px", marginBottom: "10px" }}
  />
  <button type="submit" style={{ width: "200px", marginBottom: "10px", margin: "0 auto" }}>Create Batch</button>
</form>
</>
   )}

   {!showAddBatch && (
     <>
     <h2 style={{ textAlign: "center", marginBottom: "20px" }}>-Students-</h2>
   

            <div style={batchContainerStyle}>
          {students.map((student) => (
            <div key={student.USER_ID} style={batchStyle} >
              <img src={student.IMAGE} alt={student.NAME} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
              <h3 style={headerStyle}>{student.NAME}</h3>

              <p style={detailStyle}>Email: {student.EMAIL}</p>
              <p style={detailStyle}>Phone: {student.PHONE_NUMBER}</p>
              
            </div>
          ))}
        </div>
          
            <button onClick={handleBackClick}>Back</button>
          </>
        )}

        
      </div>
    </div>
  );
}

export default BatchesContainer;



