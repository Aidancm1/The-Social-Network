const { Schema, Types } = require('mongoose');
// import thoughts here maybe

const UserSchema = new Schema(
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
      validate: {
        validator: () => Promise.resolve(false),
        message: "Email verification failed!!"
      }
    },
    Thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
  ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual('friendcount').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
