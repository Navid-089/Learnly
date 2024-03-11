import Repository from "../../../utils/database";
let oracledb = require("oracledb");
let r = new Repository();


export  async function getOffers(tutor_id)
{
    // console.log("tutor_id", tutor_id)
    const query = `select * 
    from gotoffered g join student s 
    on g.STUDENT_ID = s.USER_ID 
    join users u 
    on s.USER_ID = u.USER_ID
    where g.TUTOR_ID = :tutor_id 
    and STATUS = 'PENDING'`;
    const params = {
        tutor_id: tutor_id
    };
    const result = await r.execute(query, params);
    return result;
}

export async function acceptOffer(offer_id, tutor_id, student_id)
{
    const query = ` 
    BEGIN
    :ret := ACCEPT_OFFER(:tutor_id,:student_id,:offer_id);
    END;  `;

    const params = {
        offer_id: offer_id,
        tutor_id: tutor_id,
        student_id: student_id,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
    };

    const result = await r.execute_pl(query, params);

    console.log(result);
    
    return result;

}

export async function rejectOffer(offer_id)
{
    const query = `
    BEGIN
    :ret := REJECT_OFFER(:offer_id);
    END;  `;
    const params = {
        offer_id: offer_id,
        ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
    };

    const result = await r.execute_pl(query, params);

    console.log(result);

    return result;
    
}