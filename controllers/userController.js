const { User, Thought  } = require('../models');

module.exports = {
  // Get all students
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single student
  async getSingleUser(req, res) {
    try {
      const user = await User.findById({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({
        user,
        // grade: await grade(req.params.studentId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new student
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    try {
      const User = await User.findByIdAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' })
      }

      const thought = await Thought.delteMany({username: user.username });

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an assignment to a student
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.studentId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' })
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

async addFriend(req, res) {
  try {
    const userOne = await User.findByIdAndUpdate(req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
      );

      const userTwo = await User.findByIdAndUpdate(req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!userOne || !userTwo) {
        return res.status(404).json({ message: "No user found with that ID!"});
      }
      const display = [userOne, userTwo];
      res.json(display);
  } catch (err) {
    res.status(500).json(err);
  }
},

  // Remove assignment from a student
  async removeFriend(req, res) {
    try {
      const userOne = await User.findOneAndUpdate(
        { _id: req.params.userId, },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      const userTwo = await User.findOneAndUpdate(
        { _id: req.params.userId, },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!userOne || !userTwo) {
        return res.status(404).json({ message: "No user found with that ID!"});
      }
      const display = [userOne, userTwo];
      res.json(display);
  } catch (err) {
    res.status(500).json(err);
  }
}
};