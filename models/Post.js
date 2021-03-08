require("./User");
const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    description: { type: String },
    listingType: {
      listingTypeId: Number,
      listingTypeName: String,
    },
    propertyType: {
      propertyTypeId: Number,
      propertyTypeName: String,
    },
    price: Number,
    sizes: String,
    bedroom: Number,
    bathroom: Number,
    location: {
      x: Number,
      y: Number,
      locationName: String,
    },
    facilities: {
      carParking: Boolean,
      swimmingPool: Boolean,
    },
    telephone: String,
    email: String,
    approved: Boolean,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

// Apply the uniqueValidator plugin to userSchema.
schema.plugin(uniqueValidator, { status: 400 });

// Custom JSON Response
schema.methods.toJSON = function () {
  return {
    id: this._id,
    description: this.description,
    listingType: this.listingType,
    propertyType: this.propertyType,
    price: this.price,
    sizes: this.sizes,
    bedroom: this.bedroom,
    bathroom: this.bathroom,
    location: this.location,
    facilities: this.facilities,
    telephone: this.telephone,
    email: this.email,
    postedBy: this.postedBy,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// Custom field before save
schema.pre("save", function (next) {
  next();
});

module.exports = mongoose.model("Post", schema);
