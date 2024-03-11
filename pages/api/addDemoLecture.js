import { addDemoLecture } from "./tutor-api/demo-lectures-api";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const {tutorid,title,videoLink } = req.body;
    const result = await addDemoLecture(tutorid,title,videoLink);
    if (result.success == true) {
        return res.status(200).json({ success: true });
    }
    else {
        return res.status(401).json({ success: false });
    }
}
