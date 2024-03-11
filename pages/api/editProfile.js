import Repository from "../../utils/database";
import { editStudentProfile, editUserProfile } from "./student-api/studentprofile-api";
let r=new Repository();
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { studentUserId, name, email,s_class,institution,gender,phone_number,date_of_birth,city,area,road} = req.body;
    try {
      let student_id;
      student_id= parseInt(studentUserId);
      
      const result1 = await editStudentProfile(student_id, s_class,institution);
      const result2=await editUserProfile(student_id, name, email,gender,phone_number,date_of_birth,city,area,road);
      //console.log(result1);
      //console.log(result2);
      if(result1.data=="SUCCESSFUL" && result2.data=="SUCCESSFUL" )
         res.status(200).json({ message: 'profile  successfully edited!' });
      else
      res.status(401).json({ message: 'Error editing.' });
    } catch (error) {
      console.error('Error  editing profile :', error);
      res.status(500).json({ message: 'Error editing profile.' });
    }
  }
  