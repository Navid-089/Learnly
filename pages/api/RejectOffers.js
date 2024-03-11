import { rejectOffer } from "./tutor-api/tutoroffer-api";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

  

    const { offerId } = req.body;
    const result = await rejectOffer(offerId);
    if (result.success == true) {
        return res.status(200).json(result.data);
    }
    else {
        return res.status(401).json({ message: 'FAILEDD!' });
    }
}
