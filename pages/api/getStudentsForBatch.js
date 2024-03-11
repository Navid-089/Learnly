import { getStudentsForBatch2 } from "./tutor-api/tutorbatches-api";

const batchHandler = async (req, res) => {
    if(req.method !== "GET")
    {
        return res.status(405).end();
    }

    const batchid = req.query.batchid;
    // console.log("batchid is ---- ",batchid);
    const students = await getStudentsForBatch2(batchid);
    // console.log(students);

    if(students.success == true)
    {
        return res.status(200).json(students.data);
    }
    else
    {
        return res.status(401).json({message: "Error"});
    }
}

export default batchHandler;


