import Repository from "../../utils/database";
import { getPostSubjects } from "./tutor-api/tuitionposts-api";
let r = new Repository();
let oracledb = require("oracledb");

const Handler = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).end();
    }
    const post_id = req.query.post_id;
    const subjects = await getPostSubjects(post_id);
    if (subjects.length !== 0) {
        return res.status(200).json(subjects);
    } else {
        return res.status(401).json({ message: "Error" });
    }
    }

