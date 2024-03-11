import Repository from "../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

import { getTutorBatches, getBatchCount } from "./tutor-api/tutorbatches-api";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).end(); // Method Not Allowed
    }

    const { tutorId } = req.query;
    // console.log("Tutor ID ", tutorId);

    try {
        let tutor_id;
        tutor_id = parseInt(tutorId);

        const result1 = await getTutorBatches(tutor_id);
        // const result2 = await getBatchCount(tutor_id);

        const result = result1.data;
        console.log("RESULT : " , result);
        // const result = {
        //     batches: result1,
        //     batchCount: result2,
        // };

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching batches:", error);
        res.status(500).json({ message: "Error fetching batches." });
    }
}



