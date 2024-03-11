import Repository from "../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();
import { getTutorTuitions } from "./tutor-api/tutortuitions-api";


export default async function handler (req, res) {
    if (req.method !== "GET") {
        return res.status(405).end(); // Method Not Allowed
    }

    const { tutorId } = req.query;
    // console.log("Tutor ID ------ ", tutorId);
   

    try {
        
        const tutor_id = parseInt(tutorId);

        const result1 = await getTutorTuitions(tutor_id);
        const result = result1.data;

        // console.log("RESULT : ", result);
        
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching tuitions:", error);
        res.status(500).json({ message: "Error fetching tuitions." });
    }
}