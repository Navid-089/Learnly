// pages/api/profilecontent.js
import Repository from "../../utils/database";
import { getBatches } from "./student-api/enrolledBatches-api";

let r=new Repository();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { studentId } = req.query;
    try {
       const result= await getBatches(studentId);
       console.log(result.data);
  
       res.status(200).json(result.data);
    } catch (error) {
      console.error('Error fetching batch details:', error);
      res.status(500).json({ message: 'Error fetching batch details.' });
    }
  }
  