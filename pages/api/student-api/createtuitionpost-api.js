import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function createPost(studentId,salary,daysPerWeek,status,tuitionType,gender) {
    const query = `
  BEGIN
    :ret := CREATE_TUITION_POST(:studentId,:salary,:daysPerWeek, :status, : tuitionType, :gender);
  END;
  `;
    const params = {
        studentId : parseInt(studentId),
        salary : parseInt(salary),
        daysPerWeek : parseInt(daysPerWeek),
        status : status,
        tuitionType :tuitionType,
        gender : gender,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    };
    const result = await r.execute_pl(query, params);
    return result;
}

export async function includeSubject(post_id,subject) {
    const query = `INSERT INTO POST_INCLUDES VALUES(:post_id,:subject)`;
    const params = {post_id : post_id,
                    subject :subject
                    };
    const result = await r.execute(query, params);
    return result;
}