import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function getAllBatches(studentId) {
    const query = `SELECT * 
    FROM BATCH B
    JOIN TUTOR T ON ( T.USER_ID= B.TUTOR_ID)
    JOIN USERS U ON(T.USER_ID = U.USER_ID)
    JOIN EDUCATION ED ON(U.USER_ID = ED.TUTOR_ID)`;
    const params = {};
    const result = await r.execute(query, params);
    return result;
}


export async function joinBatch(student_id,batch_id) {
    const query = `
  BEGIN
    :ret := ENROLL_COURSE(:student_id,:batch_id);
  END;
  `;
    const params = {
        student_id : student_id,
        batch_id : batch_id,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 }
    };
    const result = await r.execute_pl(query, params);
    return result;
}