import Repository from "../../utils/database";
import { editEducation, editTutorProfile,editUserProfile } from "./tutor-api/tutorprofile-api";

let r = new Repository();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end(); // Method Not Allowed
    }

    const{tutorUserId,
        name,
        email,
        phoneNumber,
        gender, 
        dateOfBirth,
        area,
        city,
        road,
        institute,
        fieldOfStudy,
        degree,
        passingYear,
        availability,
        salary,
        yearsOfExperience}=req.body;

    try {
        let tutor_id;
        tutor_id = parseInt(tutorUserId);

        const result1 = await editTutorProfile(tutor_id, availability, yearsOfExperience, salary);
        const result2=await editUserProfile(tutor_id, name, email,gender,phoneNumber,dateOfBirth,city,area,road);
        const result3 = await editEducation(tutor_id, institute, fieldOfStudy, degree, passingYear);    
        //console.log(result1);
        //console.log(result2);
        //console.log(result3);
        if(result1.data=="SUCCESSFUL" && result2.data=="SUCCESSFUL" && result3.data=="SUCCESSFUL")
            res.status(200).json({ message: 'profile  successfully edited!' });
        else
            res.status(401).json({ message: 'Error editing.' });    
    } catch (error) {
        console.error('Error  editing profile :', error);
        res.status(500).json({ message: 'Error editing profile.' });
    }
}