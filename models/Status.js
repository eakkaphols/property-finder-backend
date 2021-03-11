const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    statusId: {
      type: Number,
      index: true,
      required: true,
      unique: true,
    },
    statusName: { type: String },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Status", schema, "status");
