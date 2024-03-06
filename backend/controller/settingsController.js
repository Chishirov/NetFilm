import userModel from "../models/userModel.js";

export const updatePassword = async (req, res) => {
  try {
    const { id, password } = await req.body;
    const user = await userModel.findById(id);
    //frontend =>( current psw + new psw )=>hasched psw
    user.password = password;
    user.save();
    res.status(200).send("Password updated");
  } catch (error) {
    res.status(500).send(error);
  }
};
//2- wenn man sein osw vergessen => in login mit button => psw ändern mit email => frontend => email

export const updateUsername = async (req, res) => {
  try {
    const { id, username } = await req.body;
    const user = await userModel.findById(id);
    user.username = username;
    user.save();
    res.status(200).send("Username updated");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateEmail = async (req, res) => {
  try {
    const { id, email } = await req.body;
    const checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      return res.status(200).send("Email already in use");
    }
    const user = await userModel.findById(id);
    user.email = email;
    user.save();
    res.status(200).send("Email updated");
  } catch (error) {
    res.status(400).send(error);
  }
};
