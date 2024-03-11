import Repository from "../../utils/database";
let oracledb = require("oracledb");
import { tutorApply } from "./tutor-api/tuitionposts-api";

let r = new Repository();
export default async function Postshandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { tutorId, postId } = req.body;
  console.log(req.body);

  const result = await tutorApply(tutorId, postId);

  console.log(result);
  if (result.data == "SUCCESSFUL") {
    return res.status(201).json({ message: "Successful" });
  } else {
    return res.status(401).json({ message: "Signup failed" });
  }
}
