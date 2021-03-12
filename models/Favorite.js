require("./User");
require("./Post");
const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      unique: true,
    },
    favorites: {
      post: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
          required: true,
        },
      ],
    },

    // listingTypeId: {
    //   type: Number,
    //   index: true,
    //   required: true,
    //   unique: true,
    // },
    // listingTypeName: { type: String },
  },
  { timestamps: false, versionKey: false }
);

// Apply the uniqueValidator plugin to userSchema.
schema.plugin(uniqueValidator, { status: 400 });

// Custom JSON Response
schema.methods.toJSON = function () {
  return {
    id: this._id,
    postedBy: this.postedBy,
    favorites: this.favorites,
  };
};

// schema.methods._favorites = async function (postId) {
//   if (this.favorites.posts.indexOf(postId) >= 0) {
//     this.favorites.posts.remove(postId);
//     //await Post.decFavoriteCount(postId);
//   } else {
//     this.favorites.posts.push(postId);
//     //await Post.incFavoriteCount(postId);
//   }

module.exports = mongoose.model("Favorite", schema, "favorites");
