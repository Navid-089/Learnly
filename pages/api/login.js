
import Repository from "../../utils/database";
let oracledb = require("oracledb");
import {getPassword,getUserByEmail} from "./login-api/login-api";
//import getUserByEmail from "./login-api/login-api";
let r=new Repository();
const loginHandler = async (req , res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;
  console.log(`${email} has password ${password}`);
  const result= await getPassword(email);
  //console.log(result);
  let user;
  if(result.data==password){
     user=await getUserByEmail(email);
  }
  if(result.data==password){
    //return res.status(200).json({ message: 'Login successfulll' });
    return res.status(200).json({result:user.data[0]});
  } else {
    return res.status(401).json({ message: 'Login failed' });
  }
};

export default loginHandler;
