import Repository from "../../../utils/database";

let oracledb = require("oracledb");
let r = new Repository();

export async function getTutorDetails(tutorId) {
    
    
    const query = `select * 
    from tutor t join users u 
    on t.USER_ID = u.USER_ID
    join education e
    on t.USER_ID = e.TUTOR_ID
    WHERE t.USER_ID = :tutorId`;

    
    const params = { tutorId: parseInt(tutorId) };  
    const result = await r.execute(query, params);
    return result;
}

export async function editTutorProfile(tutor_id, t_availability, t_years, t_salary)
{
   
    const query = `
    BEGIN 
     :ret := UPDATE_TUTOR_PROFILE(:tutor_id, :t_availability, :t_years, :t_salary); 
     END;
     `;
    const params = {
        tutor_id: tutor_id,
        t_availability: t_availability,
        t_years: t_years,
        t_salary: t_salary,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
    };
    const result = await r.execute_pl(query, params);
    return result;
}

export async function editUserProfile(
    tutor_id,
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
    :ret := UPDATE_USER_PROFILE( :tutor_id, :name, :email, :phone_number, :date_of_birth, :gender, :city, :area, :road);
  END;
  `;
    const params = {
     tutor_id: tutor_id,
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
  export async function editEducation(
    tutor_id,
    institute,
    field_of_study,
    degree,
    passing_year
  ) {
    const query = `
    BEGIN 
    :ret := UPDATE_EDUCATION(:tutor_id, :institute, :field_of_study, :degree, :passing_year);
    END;
    `;
    const params = {
        tutor_id: tutor_id,
        institute: institute,
        field_of_study: field_of_study,
        degree: degree,
        passing_year: passing_year,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
        };
    const result = await r.execute_pl(query, params);
    return result;
    }
    
