// pages/allbatches.js
import { useEffect, useState } from 'react';
// import styles from '../styles/AllBatches.module.css';
// import 'normalize.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Link from 'next/link';

import styles from "../styles/AllBatches.module.css";
import 'normalize.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';



const AllBatches = ({studentId}) => {
    const [allBatches, setAllBatches] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [batchToJoin, setBatchToJoin] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetchAllBatches();
    }, []);

    const fetchAllBatches = async () => {
        try {
            const response = await fetch('/api/allbatches');
            const data = await response.json();
            setAllBatches(data);
        } catch (error) {
            console.error('Error fetching all batches:', error);
        }
    };
    const handleJoinBatch = (batchId) => {
        setBatchToJoin(batchId);
        setShowConfirmation(true);
    };

    const confirmJoinBatch = async () => {
        try {
            const response = await fetch(`/api/joinbatch?studentId=${studentId}&batchId=${batchToJoin}`, {
                method: 'POST',
            });
            const data = await response.json();
            if (data.message == "Joined") {
                setErrorMessage('Joined successfully!');
                fetchAllBatches();
            }
            if (data.message == 'Already joined') {
                setErrorMessage('You are already joined in this batch');
                fetchAllBatches();
            }
            else {
                
                fetchAllBatches();
                setErrorMessage('Your class does not match the batch class');
            }
        } catch (error) {
            console.error('Error Joining batch:', error);
            setErrorMessage('Could not join the batch.');
        }
        setShowConfirmation(false);
    };
    const handleCloseErrorMessage = () => {
        setErrorMessage(null);
    };

    const cancelJoinBatch = () => {
        setBatchToJoin(null);
        setShowConfirmation(false);
    };

    return (
        
        
        <div className={styles.bigcontainer}>

            <div className={styles.container}>
            <h1>All Batches</h1>
            {errorMessage && (
                <div className={styles.confirmationmodal}>
                    <p>{errorMessage}</p>
                    <button onClick={handleCloseErrorMessage}>OK</button>
                </div>
            )}
            {allBatches.length === 0 ? (
                <p>No batches available.</p>
            ) : (
                allBatches.map((batch, index) => (
                    <div key={batch.BATCH_ID} className={styles.batchcontainer}>

                        <div className={styles.batchdetails}>
                            <h2>Batch {index + 1}</h2>
                            <p>Tutor : {batch.NAME} ( {batch.INSTITUTE}, {batch.FIELD_OF_STUDY})</p>
                            <p>Subject : {batch.SUBJECT}</p>
                            <p>Class of Batch : {batch.BATCH_CLASS}</p>
                            <p>Days Per Week : {batch.DAYS_PER_WEEK}</p>
                            <p>Class Start Time : {batch.CLASS_TIME}</p>
                            <p>Tutor Contact No.: {batch.PHONE_NUMBER}</p>
                            <p>Tutor email : {batch.EMAIL}</p>
                        </div>
                        <div className={styles.batchactions}>
                            <button className={styles.joinbtn} onClick={() => handleJoinBatch(batch.BATCH_ID)}>Join Batch</button>
                        </div>
                        <hr />
                    </div>
                ))
            )}
            {showConfirmation && (
                <div className={styles.confirmationmodal}>
                    <p>Are you sure you want to join the batch?</p>

                    <div className={styles.confirmbtns}>
                        <button className={styles.yes} onClick={confirmJoinBatch}>Yes</button>
                        <button className={styles.no} onClick={cancelJoinBatch}>No</button>
                    </div>


                </div>
            )}

            </div>
        </div>
    );
};

export default AllBatches;
