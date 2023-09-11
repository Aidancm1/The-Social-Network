const { Schema, Types } = require('mongoose');
// import thoughts here maybe

const assignmentSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      // figure this out.
      trimmed: true,
      
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // Look at some stuff from wk 18
    },
    score: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = assignmentSchema;
