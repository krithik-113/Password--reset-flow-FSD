const mongoose = require("mongoose");

const UserInfoSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: String,
  },
  {
    timestamps: true,
  }
);

const UserInfoModel = mongoose.model("UserInfo", UserInfoSchema);

module.exports = UserInfoModel;
