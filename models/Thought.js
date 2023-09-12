const { Schema, model } = require('mongoose');
// import user stuff 

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
  },
    reactionBody, {
      type: String,
     required: true,
     maxLength: 280,
     trim: true,
  },
  username, {
    type: String,
    required: true,
  },
  createdAt, {
    type: Date,
    default: Date.now,
    get: (createdAtTime) => dateFormat(createdAtTime),
  }, 
);

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
      default: Date.now(),
      // custom getter sounds fun
      get: (createdAtTime) => dateFormat(createdAtTime),
    },
    reactions: [ReactionSchema]
      // nested documents reactionSchema time for research
    },
    username: {

      type: String,
      required: true,
    },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);
// change some stuff to make sense
const Thought = model('thought', ThoughtSchema);

module.exports = Thought;
