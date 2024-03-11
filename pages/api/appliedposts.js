import Repository from "../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();
import { getAppliedPosts } from "./tutor-api/tuitionposts-api";

export default async function AppliedPostsHandler(req, res) {

    if(req.method !== "GET")
    {
        return res.status(405).end(); // Method Not Allowed
    }

    const { tutorId } = req.query;
 
    const result = await getAppliedPosts(tutorId);

    console.log(result);
    if(result.data == "SUCCESSFUL")
    {
        return res.status(201).json(result.data);
    }
    else
    {
        return res.status(401).json({ message: "Signup failed" });
    }
}


