import Repository from "../../utils/database";
import { getAllTutors } from "./student-api/studenthome-api";
let oracledb = require("oracledb");
let r=new Repository();

const HomeHandler = async (req , res) => {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }

    const tutors = await getAllTutors();

    //console.log(tutors);

    if(tutors.success==true){
      //return res.status(200).json({ message: 'Login successfulll' });
      return res.status(200).json(tutors.data);
    } else {
      return res.status(401).json({ message: 'Login failed' });
    }
  };
  
  export default HomeHandler;
