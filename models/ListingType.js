const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    listingTypeId: {
      type: Number,
      index: true,
      required: true,
      unique: true,
    },
    listingTypeName: { type: String },
  },
  { timestamps: true, versionKey: false }
);

// Apply the uniqueValidator plugin to userSchema.
schema.plugin(uniqueValidator);

module.exports = mongoose.model("ListingType", schema, "listingType");
