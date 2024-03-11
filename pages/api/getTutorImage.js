import Repository from "../../utils/database";


export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { tutorid } = req.body;
    const tutorId = parseInt(tutorid);
    // console.log("TUTOR ID ",tutorId );
    try {
     let r=new Repository();
     const query= 
     `SELECT IMAGE from USERS where USER_ID = :tutorId`;
    const params = { tutorId: tutorId };
    // console.log(query);
    const result = await r.execute(query, params);
    //  console.log(result);
     
      res.status(200).json(result.data);
    } catch (error) {
      console.error('Error image:', error);
      res.status(500).json({ message: 'Error image.' });
    }
  }
   