import Repository from "../../utils/database";
import { getTutorDetails } from "./tutor-api/tutorprofile-api";

let r = new Repository();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { tutorId } = req.query;
//   console.log("tutorID ------- " ,tutorId); 
  try {
    const result = await getTutorDetails(tutorId);

    if (result.success === true) {
      return res.status(200).json(result.data[0]);
    } else {
      return res.status(500).json({ error: "Database error" });
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occurred", details: error.message });
  }
}
