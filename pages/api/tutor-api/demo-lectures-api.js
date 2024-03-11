import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function getAllDemoLectures() {
    const query = `select * from demo_lectures`;
    const params = {};

    const result = await r.execute(query, params);

    return result;
}

export async function addDemoLecture(tutor_id, title, link) 
{
    const query = ` 
    BEGIN
    :ret := ADD_DEMO_LECTURES(:tutor_id,:title,:link);
    END;  `;

    const params = {
        tutor_id: tutor_id,
        title: title,
        link: link,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
    };

    const result = await r.execute_pl(query, params);
    
    return result;

}
