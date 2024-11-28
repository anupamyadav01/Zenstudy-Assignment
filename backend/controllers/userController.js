export const registerUser = (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log("Error in register user", error);
    res.status(404).json({ error: "Unable to register user, try again." });
  }
  res.send("HEllO MVC!!");
};
