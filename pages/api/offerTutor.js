// pages/api/offerTutor.js
import Repository from "../../utils/database";
import { createOffer } from "./student-api/studenthome-api";
let r=new Repository();
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { studentUserId, tutorUserId, subjects } = req.body;
    try {
      let student_id,tutor_id;
      student_id= parseInt(studentUserId);
      tutor_id = parseInt(tutorUserId);
      const result= await createOffer(student_id,tutor_id,subjects);

      if(result.data=="SUCCESSFUL")
         res.status(200).json({ message: 'Offer successfully sent!' });
      else
      res.status(401).json({ message: 'Error sending offer.' });
    } catch (error) {
      console.error('Error saving offer:', error);
      res.status(500).json({ message: 'Error sending offer.' });
    }
  }
  