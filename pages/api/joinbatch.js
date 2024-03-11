import { joinBatch } from "./student-api/allbatches-api";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { studentId, batchId } = req.query;
  
    const student_id= parseInt(studentId);
    const batch_id= parseInt(batchId);
    try {

      const result=await joinBatch(student_id,batch_id);

      //console.log(result);

      if(result.data=="SUCCESSFUL")
         res.status(200).json({ message: 'Joined' });
      else if(result.data=="ORA-00001: unique constraint (LEARNLY.SYS_C007606) violated")
      res.status(401).json({ message: 'Already joined' });
      else res.status(401).json({ message: 'Class mismatch' });
  
      //res.status(200).json({ message: 'Successfully left the batch.' });
    } catch (error) {
      console.error('Error joining batch:', error);
      res.status(500).json({ message: 'Error joining batch' });
    }
  }
  
  
  
  
  