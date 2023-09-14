const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById({ _id: req.params.courseId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: thought._id } },
      { runValidators: true, new: true }
    );
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      const user = await User.findByIdAndUpdate({ _id: { $in: thought.users } });
      res.json({ message: 'user and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId,
        { $addToSet: { reactions: req.body} },
        { runValidators: true, new: true},
        )
        if (!thought) {
          return res.status(404).json({ message: 'No user with this ID!'});
        }
        res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId,
        { $pull: { reactions: {reactionId: req.params.reactionId} } },
        { runValidators: true, new: true }
        );
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this ID!'});
        }
        res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
