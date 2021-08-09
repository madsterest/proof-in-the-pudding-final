const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
