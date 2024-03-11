import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function getTutorTuitions(tutor_id) {
    const query = 
    ` 
    select tp.SUBJECTS, u.NAME, s.INSTITUTION, u.IMAGE, s.CLASS, u.CITY, u.AREA, u.ROAD, u.PHONE_NUMBER, tp.status, tp.DAYS_PER_WEEK, tp.TUITION_TYPE
from teaching t join student s
on t.STUDENT_ID = s.USER_ID
join users u
on s.USER_ID = u.USER_ID
join tuition_post tp
on t.POST_ID = tp.POST_ID
where t.TUTOR_ID = :tutor_id
union
select g.SUBJECTS, u.NAME, s.INSTITUTION, u.IMAGE ,s.CLASS, u.CITY, u.AREA, u.ROAD, u.PHONE_NUMBER, g.status, g.DAYS_PER_WEEK, g.TUITION_TYPE
from teaching t join student s
on t.STUDENT_ID = s.USER_ID
join users u
on s.USER_ID = u.USER_ID
join gotoffered g
on t.OFFER_ID = g.OFFER_ID
where t.TUTOR_ID = :tutor_id`;

const params = {
    tutor_id: tutor_id, 
};


    const result = await r.execute(query, params);
    // console.log("RESULT IN API : ", result);

    return result;
}

/*
https://res.cloudinary.com/dhtogoc8c/image/upload/v1692917952/kh7quxxgfezjv9txbsam.jpg
    
 */   