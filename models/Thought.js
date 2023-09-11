const { Schema, model } = require('mongoose');
// import user stuff 

const courseSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // more validation stuff.
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // custom getter sounds fun
    },
    reactions: {
      // nested documents reactionSchema time for research
      type: Date,
      default: Date.now(),
    },
    username:
      {
        type: String,
        required: true,
      },
  },
);
// change some stuff to make sense
const Course = model('course', courseSchema);

module.exports = Course;
