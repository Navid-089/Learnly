import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function getBatches(studentId) {
    const query = `SELECT * 
                   FROM (BATCH B NATURAL JOIN ENROLLEDIN E)
                   JOIN TUTOR T ON ( T.USER_ID= B.TUTOR_ID)
                   JOIN USERS U ON(T.USER_ID = U.USER_ID)
                   JOIN EDUCATION ED ON(U.USER_ID = ED.TUTOR_ID)
                   WHERE STUDENT_ID = :studentId `;
    const params = {studentId : parseInt(studentId)};
    const result = await r.execute(query, params);
    return result;
}

export async function leaveBatch(studentId,batchId) {
    const query = `DELETE FROM ENROLLEDIN
                   WHERE STUDENT_ID = :studentId AND BATCH_ID = :batchId`;
    const params = {studentId : studentId,
                     batchId : batchId  
                    };
    const result = await r.execute(query, params);
    return result;
}