// pages/enrolledbatches.js
import { useEffect, useState } from 'react';
import styles from "../styles/enrolledbatches.module.css"

const EnrolledBatches = ({ studentId }) => {
    const [enrolledBatches, setEnrolledBatches] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [batchToLeave, setBatchToLeave] = useState(null);

    useEffect(() => {
        fetchEnrolledBatches();
    }, []);

    const fetchEnrolledBatches = async () => {
        try {
            const response = await fetch(`/api/enrolledbatches?studentId=${studentId}`);
            const data = await response.json();
            setEnrolledBatches(data);
        } catch (error) {
            console.error('Error fetching enrolled batches:', error);
        }
    };


    const handleLeaveBatch = (batchId) => {
        setBatchToLeave(batchId);
        setShowConfirmation(true);
    };

    const confirmLeaveBatch = async () => {
        try {
            const response = await fetch(`/api/leavebatch?studentId=${studentId}&batchId=${batchToLeave}`, {
                method: 'POST',
            });
            if (response.status === 200) {
                fetchEnrolledBatches();
            }
        } catch (error) {
            console.error('Error leaving batch:', error);
        }
        setShowConfirmation(false);
    };

    const cancelLeaveBatch = () => {
        setBatchToLeave(null);
        setShowConfirmation(false);
    };
    return (
        <div className={styles.bigcontainer}>

            <div className={styles.container}>
            <h1>Enrolled Batches</h1>
            {enrolledBatches.length === 0 ? (
                <p>You are not enrolled in any batch.</p>
            ) : (
                enrolledBatches.map((batch, index) => (
                    <div key={batch.BATCH_ID} className={styles.batchcontainer}>
                        <div className={styles.batchdetails}>
                            <h2><u>Batch {index + 1}</u></h2>
                            <p>Tutor : {batch.NAME} ( {batch.INSTITUTE}, {batch.FIELD_OF_STUDY})</p>
                            <p>Subject : {batch.SUBJECT}</p>
                            <p>Class of Batch : {batch.BATCH_CLASS}</p>
                            <p>Days Per Week : {batch.DAYS_PER_WEEK}</p>
                            <p>Class Start Time : {batch.CLASS_TIME}</p>
                            <p>Tutor Contact No.: {batch.PHONE_NUMBER}</p>
                        </div>
                        <div className={styles.batchactions}>
                            <button className={styles.joinbtn} onClick={() => handleLeaveBatch(batch.BATCH_ID)}>Leave Batch</button>
                        </div>
                        <hr />
                    </div>
            ))
            )}
             { showConfirmation && (
                <div className={styles.confirmationmodal}>
                    <p>Are you sure you want to leave the batch?</p>

                    <div className={styles.confirmbtns}> 
                        <button className={styles.yes} onClick={confirmLeaveBatch}>Yes</button>
                        <button className={styles.no} onClick={cancelLeaveBatch}>No</button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default EnrolledBatches;
