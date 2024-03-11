import { Cancel_Application } from "./tutor-api/tuitionposts-api";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }


    const { postId, tutor_id } = req.body;

    const post_id = parseInt(postId);
    console.log(tutor_id,post_id, "tutor_id,post_id");


    const result = await Cancel_Application(tutor_id, post_id);
    if (result.success == true) {
        return res.status(200).json(result.data);
    }
    else {
        return res.status(401).json({ message: 'FAILEDD!' });
    }
}


