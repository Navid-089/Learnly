import Repository from "../../utils/database";
import oracledb from "oracledb";

let r = new Repository();
const uploadHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }
  const { image, id } = req.body;
  console.log(`${id} has image ${image}`);

  const query = `BEGIN
    :ret := CHANGE_PROFILE_PICTURE(:id,:image);
    END;`;

  const params = {
    id: id,
    image: image,
    ret: { dir: oracledb.BIND_OUT, type: oracledb.VARCHAR2 },
  };

  const result = await r.execute_pl(query, params);
  console.log(result);
  if (result.success == true) {
    return res.status(200).json({ message: "Successful" });
  } else {
    return res.status(401).json({ message: "Unsuccessful" });
  }
};

export default uploadHandler;
