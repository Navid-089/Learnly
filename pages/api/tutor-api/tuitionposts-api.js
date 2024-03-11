import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function getAllPosts(tutor_id) {
  // const query = `select * from tuition_post tp
  // join student s on tp.STUDENT_ID = s.USER_ID
  // join users u on s.USER_ID = u.USER_ID
  // left join applies a on tp.POST_ID = a.POST_ID AND a.TUTOR_ID = :tutor_id
  // WHERE a.POST_ID IS NULL;`;

  /* I need to check if the teacher already tutors the student
  that has posted the post. If he does, the post won't be shown to him.*/

  /*getting error sql command not properly ended*/
  const query = `
  SELECT *
  FROM tuition_post tp
  JOIN student s ON tp.STUDENT_ID = s.USER_ID
  JOIN users u ON s.USER_ID = u.USER_ID
  LEFT JOIN applies a ON tp.POST_ID = a.POST_ID AND a.TUTOR_ID = :tutor_id
  LEFT JOIN teaching t ON t.STUDENT_ID = s.USER_ID AND t.TUTOR_ID = :tutor_id
  WHERE a.POST_ID IS NULL AND t.STUDENT_ID IS NULL
  `;
  

  const params = {
    tutor_id: tutor_id,
  };


  const result = await r.execute(query, params);

  console.log("RESULT ",result);

  return result;
}

export  async function tutorApply(tutor_id, post_id) {
  const query = `
  BEGIN
    :ret := APPLY_FOR_TUITION(:tutor_id,:post_id);
    END;  `;
  const params = {
    tutor_id: tutor_id,
    post_id: post_id,
    ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
  };

  console.log(query, params);

  const result = await r.execute_pl(query, params);
  console.log("RESULT" ,result);
  return result;
}


export async function getAppliedPosts(tutor_id) 
{
  const query = `select * 
  from tuition_post tp join student s
  on tp.STUDENT_ID = s.USER_ID
  join users u
  on s.USER_ID = u.USER_ID
  where tp.POST_ID in (select POST_ID from APPLIES where TUTOR_ID = :tutor_id)`;
  const params = {
    tutor_id: tutor_id,
  };

  

  const result = await r.execute(query, params);

  console.log("RESULT ",result);

  return result;
}

export async function getPostSubjects(post_id)
{
    try {
    const query =
    `select * 
    from POST_INCLUDES 
    where POST_ID = :post_id`;

    const params = {
        post_id: post_id,
    };

    const result = await r.execute(query, params);
    
    const subjectsArray = result.map(row => row.SUBJECT_NAME);
    return subjectsArray;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
}


// export async function getAppliedPosts(tutor_id)
// {
//   const query = `select * 
//   from tuition_post tp join student s
//   on tp.STUDENT_ID = s.USER_ID
//   join users u
//   on s.USER_ID = u.USER_ID
//   where tp.POST_ID in (select POST_ID from APPLIES where TUTOR_ID = :tutor_id)`;
//   const params = {
//     tutor_id: tutor_id,
//   };

//   const result = await r.execute(query, params);

//   return result;
// }


export async function Cancel_Application(tutor_id, post_id)
{
  const query = `
  BEGIN
    :ret := CANCEL_APPLICATION(:tutor_id,:post_id);
    END;  `;
  const params = {
    tutor_id: tutor_id,
    post_id: post_id,
    ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
  };

  // console.log(query, params);

  const result = await r.execute_pl(query, params);
  console.log("RESULT" ,result);
  return result;
}