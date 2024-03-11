import { createBatch } from "./tutor-api/tutorbatches-api";

export default async function handler(req, res) {

    if(req.method !== "POST"){
        return res.status(405).end();
    }

    console.log("req body",req.body)

    /*
        
      tutorid,
      s_class,
      classTime,
      subject,
      daysPerWeek,
    

    */
    const {tutorid,s_class,classTime,subject,daysPerWeek} = req.body;

    const result = await createBatch(tutorid,s_class,classTime,subject,daysPerWeek);

    if(result.success == true){
        return res.status(200).json({success:true});
    }
    else{
        return res.status(401).json({success:false});
    }
}
