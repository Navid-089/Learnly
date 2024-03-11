// pages/api/profilecontent.js
import Repository from "../../utils/database";
import { getStudentDetails } from "./student-api/studentprofile-api";
let r=new Repository();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { studentId } = req.query;
    try {
       const result= await getStudentDetails(studentId);
       //console.log(result.data[0]);
  
       res.status(200).json(result.data[0]);
    } catch (error) {
      console.error('Error fetching student details:', error);
      res.status(500).json({ message: 'Error fetching student details.' });
    }
  }
  