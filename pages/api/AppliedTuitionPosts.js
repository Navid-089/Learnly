import { getAppliedPosts } from "./tutor-api/tuitionposts-api";

export default async function AppliedTuitionPosts(req, res) {
    if(req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { tutorId } = req.query;
  
    const result = await getAppliedPosts(tutorId);

    // console.log(result);
    if(result) {
        return res.status(200).json(result.data);
    }
    else {
        return res.status(401).json({ message: 'Error fetching applied posts' });
    }
}

