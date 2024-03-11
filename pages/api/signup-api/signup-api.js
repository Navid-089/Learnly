import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function createUser(name,email,password,role) {
    const query = `
  BEGIN
    :ret := CREATE_USER(:name,:email,:password, :role);
  END;
  `;
    const params = {
        name :name,
        email: email,
        password : password,
        role :role,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 }
    };
    const result = await r.execute_pl(query, params);
    return result;
}