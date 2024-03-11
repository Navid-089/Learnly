// pages/api/allbatches.js

import { getAllBatches } from "./student-api/allbatches-api";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }

    try {
        const result= await getAllBatches();
        //console.log(result.data);
   
        res.status(200).json(result.data);
  
      //res.status(200).json(allBatches);
    } catch (error) {
      console.error('Error fetching all batches:', error);
      res.status(500).json({ message: 'Error fetching all batches.' });
    }
  }
  