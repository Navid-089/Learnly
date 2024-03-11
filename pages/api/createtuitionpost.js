// pages/api/createtuitionpost.js

import { createPost, includeSubject } from "./student-api/createtuitionpost-api";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { studentId,salary,subject, daysPerWeek, tuitionType, tutorGender } = req.body;
    console.log(studentId,salary,daysPerWeek,tuitionType,tutorGender,subject);
    const status="available";
    const subjects = subject.split(',');
  
    try {
     const result= await createPost(studentId,salary,daysPerWeek,status,tuitionType,tutorGender);
     console.log(typeof(result.data));
     //const postId=result.data;
     let i=0;
     while(i < subjects.length){
        const res=await includeSubject(result.data,subjects[i]);
        i++;
     }
      res.status(201).json({ message: 'Tuition post created successfully.' });
    } catch (error) {
      console.error('Error creating tuition post:', error);
      res.status(500).json({ message: 'Error creating tuition post.' });
    }
  }