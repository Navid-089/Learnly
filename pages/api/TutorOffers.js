import { getOffers } from "./tutor-api/tutoroffer-api";

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
        }

    const { tutorId } = req.query;
    const tutor_id = parseInt(tutorId);
    const offers = await getOffers(tutor_id);
    
    if(offers.success==true){
        
        return res.status(200).json(offers.data);
        } else {
        return res.status(401).json({ message: 'FAILEDD!' });
        }

    }


