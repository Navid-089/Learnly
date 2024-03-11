import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function createOffer(student_id,tutor_id,subjects) {
    const query = `
  BEGIN
    :ret := CREATE_OFFER(:student_id,:tutor_id,:subjects);
  END;
  `;
    const params = {
        student_id : student_id,
        tutor_id : tutor_id,
        subjects : subjects,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 }
    };
    const result = await r.execute_pl(query, params);
    return result;
}
export async function getAllTutors() {
    const query = `select * from tutor natural join users `;
    const params = {};
    const result = await r.execute(query, params);
    return result;
}
