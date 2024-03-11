import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function getPassword(email) {
    const query = `
  BEGIN
    :ret := GET_PASSWORD( :email );
  END;
  `;
    const params = {
        email: email,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 }
    };
    const result = await r.execute_pl(query, params);
    return result;
}

export async function getUserByEmail(email) {
    const query = `SELECT * FROM USERS  
                   WHERE email = :email`;
    const params = {
        email: email
    };
    const result = await r.execute(query, params);
    return result;
}



