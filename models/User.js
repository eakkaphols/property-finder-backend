const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator"),
  crypto = require("crypto"),
  jwt = require("jsonwebtoken"),
  config = require("../configs/app");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: true,
      required: true,
      unique: true,
      uniqueCaseInsensitive: false,
    },
    password: { type: String, index: true },
    fullname: { type: String },
    role: {type:String },
    email: { type: String },
    tel: { type: Number },
    // createdatdate: { type: Date, default: Date.now },
    // updatedatdate: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

// Apply the uniqueValidator plugin to userSchema.
schema.plugin(uniqueValidator);

// Generate JWT
schema.methods.generateJWT = function (obj) {
  let today = new Date(),
    exp = new Date(today);
  // exp.setDate(today.getDate() + config.token_exp_days || 1);
  exp.setMinutes(today.getMinutes() + 30);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    config.secret
  );
};

// Hash Password
schema.methods.passwordHash = function (password) {
  return crypto.createHash("sha1").update(password).digest("hex");
};

// Verify Password
schema.methods.validPassword = function (password) {
  console.log(this.passwordHash(password));
  return this.passwordHash(password) === this.password;
};

// Custom field before save
schema.pre("save", function (next) {
  this.password = this.passwordHash(this.password);
  next();
});

module.exports = mongoose.model("User", schema);
