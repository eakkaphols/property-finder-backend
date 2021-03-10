const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    propertyTypeId: {
      type: Number,
      index: true,
      required: true,
      unique: true,
    },
    propertyTypeName: { type: String },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("PropertyType", schema, "propertyType");
