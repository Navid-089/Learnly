import { acceptOffer } from "./tutor-api/tutoroffer-api";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    // console.log("Request body:", req.body);

    const { offerId, tutorId, studentId } = req.body;
    // const offer_id = parseInt(offerId);
    // const tutor_id = parseInt(tutorId);
    // const student_id = parseInt(studentId);

    // console.log("Parsed IDs:", offer_id, tutor_id, student_id);

    console.log(req.body);
    

    const result = await acceptOffer(offerId,tutorId, studentId);
    if (result.success == true) {
        return res.status(200).json(result.data);
    } else {
        return res.status(401).json({ message: 'FAILEDD!' });
    }
}
