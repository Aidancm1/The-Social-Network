const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");
// import user stuff

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // more validation stuff.
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // custom getter sounds fun
      get: (timestamp) => dateFormat(timestamp),
    },
    reactions: [ReactionSchema],
    // nested documents reactionSchema time for research
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
// change some stuff to make sense
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
