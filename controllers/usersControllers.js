const User = require("./../models/usersModel");
const Tour = require("./../models/usersModel");
const APIFeatures = require("./../apiModules/APIFeatures");


exports.getAllUsers = async (req, res) => {
  try {
    const qUsers = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const users = await qUsers.query;
    res
      .status(200)
      .json({ status: "Success", Number: users.length, data: users });
  } catch (error) {
    res.status(500).json({ status: "Failed", Error: error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const createdUsers = await Tour.create(data);
    res.status(201).json({ status: "Success", data: createdUsers });
  } catch (error) {
    res.status(500).json({ status: "Failed", Error: error });
  }
};
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({ status: "Success", data: user });
  } catch (error) {
    res.status(500).json({ status: "Failed", Error: error });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ status: "Success", data: update });
  } catch (error) {
    res.status(500).json({ status: "Failed", Error: error });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const duser = await User.findByIdAndDelete(id);
    res.status(200).json({ status: "Success", data: duser });
  } catch (error) {
    res.status(500).json({ status: "Failed", Error: error });
  }
};
