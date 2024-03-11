import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();

export async function getTutorBatches(tutor_id) {
    const query = 
    `select * 
    from batch b join tutor t 
    on b.TUTOR_ID = t.USER_ID
    
    where b.TUTOR_ID = :tutor_id`;
    const params = {
        tutor_id: tutor_id,
    };
    
    const result = await r.execute(query, params);
    // console.log("RESULT IN TGETUTORBATCHES:", result)
    
    return result;
}   


export async function createBatch(tutor_id, batch_class, class_time, subject, DAYS_PER_WEEK)
{
    const query = ` 
    BEGIN
    :ret := CREATE_BATCH(:tutor_id,:batch_class,:class_time,:subject,:DAYS_PER_WEEK);
    END;  `;

    const params = {
        tutor_id: tutor_id,
        batch_class: batch_class,
        class_time: class_time,
        subject: subject,
        DAYS_PER_WEEK: DAYS_PER_WEEK,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
    };

    const result = await r.execute_pl(query, params);
    
    return result;

}

/* as a tutor can handle a number of batches, in this getbatchcount i have to pass the batch_id number)
*/
/* will be doing it later */ 

export async function getStudentsForBatch2(batch_id)
{
    const query = `select * 
    from enrolledin e join student s
    on e.STUDENT_ID = s.USER_ID
    join users u
    on s.USER_ID = u.USER_ID
    where e.BATCH_ID = :batch_id`;

    const params = {
        batch_id: batch_id,
    };

    const result = await r.execute(query, params);

    return result;
   
}