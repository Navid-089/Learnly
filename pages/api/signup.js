import Repository from "../../utils/database";
import { createUser } from "./signup-api/signup-api";
let r=new Repository();

const handleSignup = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, email, password, role } = req.body;
  console.log(`${email} has password ${password} encrypted ${password}  has role ${role}`);

  const result=await createUser(name,email,password,role);
  //console.log("result",result);
  if(result.data== 'SUCCESSFUL'){
    return res.status(201).json({ message: 'User registered successfully' });
  }
  else {
    return res.status(401).json({ message: 'Signup failed' });
  }
 
};

export default handleSignup;
