require("./User");
require("./ListingType");
require("./PropertyType");
const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    description: { type: String },
    listingType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ListingType",
      required: true,
    },
    propertyType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PropertyType",
      required: true,
    },
    price: { type: String, default: "" },
    monthlyRent: { type: String, default: "" },
    squareFeet: { type: String, default: "" },
    numBedrooms: { type: Number, default: 0 },
    numBathrooms: { type: Number, default: 0 },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    carParking: { type: Boolean, default: false },
    swimmingPool: { type: Boolean, default: false },
    carParking: { type: Boolean, default: false },
    swimmingPool: { type: Boolean, default: false },
    internetWifi: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    address: { type: String, default: "" },
    telephone: { type: String, default: "" },
    email: { type: String, default: "" },
    approved: { type: Boolean, default: true },
    waitingApproval: { type: Boolean, default: true },
    isPromote: { type: Boolean, default: false },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // photos: [{
    //   url: string,
    // }]
  },
  { timestamps: true, versionKey: false }
);

// const listingTypeSchema = new mongoose.Schema({
//   listingTypeId: Number,
//   listingTypeName: String,
// });
// const ListingType = mongoose.model("ListingType", listingTypeSchema);

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
    monthlyRent: this.monthlyRent,
    squareFeet: this.squareFeet,
    numBedrooms: this.numBedrooms,
    numBathrooms: this.numBathrooms,
    latitude: this.latitude,
    longitude: this.longitude,
    carParking: this.carParking,
    swimmingPool: this.swimmingPool,
    internetWifi: this.internetWifi,
    petsAllowed: this.petsAllowed,
    airConditioning: this.airConditioning,
    address: this.address,
    telephone: this.telephone,
    email: this.email,
    approved: this.approved,
    waitingApproval: this.waitingApproval,
    isPromote: this.isPromote,
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
