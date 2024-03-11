import Repository  from "../../utils/database";
let oracledb    = require("oracledb");
let r           = new Repository();
import { getAllDemoLectures } from "./tutor-api/demo-lectures-api";

const demoHandler = async (req, res) => {

    if (req.method !== "GET") {
        return res.status(405).end();
    }

    const demo_lectures = await getAllDemoLectures();

    if (demo_lectures.success == true) {
        return res.status(200).json(demo_lectures.data);
    } else {
        return res.status(401).json({ message: "Error" });
    }
}

export default demoHandler;