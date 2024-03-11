import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function getStudentDetails(studentId) {
  const query = `select * from student natural join users where USER_ID = :studentId `;
  const params = { studentId: parseInt(studentId) };
  const result = await r.execute(query, params);
  return result;
}

export async function editStudentProfile(student_id, s_class, institution) {
  const query = `
  BEGIN
    :ret := UPDATE_STUDENT_PROFILE( :student_id, :institution, :s_class);
  END;
  `;
  const params = {
    student_id: student_id,
    institution: institution,
    s_class: s_class,
    ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
  };
  const result = await r.execute_pl(query, params);
  return result;
}

export async function editUserProfile(
  student_id,
  name,
  email,
  gender,
  phone_number,
  date_of_birth,
  city,
  area,
  road
) {
  const query = `
BEGIN
  :ret := UPDATE_USER_PROFILE( :student_id, :name, :email, :phone_number, :date_of_birth, :gender, :city, :area, :road);
END;
`;
  const params = {
    student_id: student_id,
    name: name,
    email: email,
    phone_number: phone_number,
    date_of_birth: date_of_birth,
    gender: gender,
    city: city,
    area: area,
    road: road,
    ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
  };
  const result = await r.execute_pl(query, params);
  return result;
}
