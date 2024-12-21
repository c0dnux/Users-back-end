const User = require("./../models/usersModel");
const APIFeatures = require("./../apiModules/APIFeatures");
const catchAsync = require("./../apiModules/catchAsync");
const ErrApp = require("./../apiModules/errApp");
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const qUsers = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const users = await qUsers.query;
  res
    .status(200)
    .json({ status: "Success", Number: users.length, data: users });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const data = req.body;
  const createdUsers = await User.create(data);
  res.status(201).json({ status: "Success", data: createdUsers });
});
exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrApp("User Does not exist", 404));
  }
  res.status(200).json({ status: "Success", data: user });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const update = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ status: "Success", data: update });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const duser = await User.findByIdAndDelete(id);
  if (!duser) {
    return next(new ErrApp("User Does not exist", 404));
  }
  res.status(200).json({ status: "Success", data: duser });
});
