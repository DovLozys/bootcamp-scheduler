import query from "../db";

async function getProfileHistory(req, res) {
  console.log("getting profile data");
  const data = await query("GET * FROM profiles WHERE profile_name = $1;", [
    req.params.name,
  ]);

  res.json({
    success: true,
    message: "data recieved from profile",
    payload: data.rows,
  });
}

async function deleteProfileHistory(req, res) {
  const data = await query("DELETE FROM profiles WHERE profile_name = $1;", [
    req.params.name,
  ]);

  res.json({
    success: true,
    message: "data deleted, homie safe",
  });
}

export { getProfileHistory, deleteProfileHistory };
