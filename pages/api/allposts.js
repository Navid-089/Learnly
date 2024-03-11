import Repository from "../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();
import { getAllPosts } from "./tutor-api/tuitionposts-api";

const HomeHandler = async (req , res) =>  {
  // if (req.method !== "GET") {
  //   return res.status(405).end();
  // }
  //console.log("meow");
  const { tutorId } = req.query;
  // console.log("tutorId", tutorId );
  const tutor_id = parseInt(tutorId);
  // console.log("tutor_id", tutor_id);
  const posts = await getAllPosts(tutor_id);
  // console.log("posts", posts);
  // console.log(posts.data);

  if (posts.success == true) {
    return res.status(200).json(posts.data);
  } else {
    return res.status(401).json({ message: "Error" });
  }
}
  
export default HomeHandler;