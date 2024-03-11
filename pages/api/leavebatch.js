import { leaveBatch } from "./student-api/enrolledBatches-api";
import OracleDB from "oracledb";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { studentId, batchId } = req.query;
  
    const student_id= parseInt(studentId);
    const batch_id= parseInt(batchId);
    try {

      const result=await leaveBatch(student_id,batch_id);
  
      res.status(200).json({ message: 'Successfully left the batch.' });
    } catch (error) {
      console.error('Error leaving batch:', error);
      res.status(500).json({ message: 'Error leaving the batch.' });
    }
  }
  
  
  
  
  