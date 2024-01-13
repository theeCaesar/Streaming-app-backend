const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: [true, 'the movie must have a name'],
    },
    movieURL: {
      type: String,
      required: [true, 'the movie must have a name'],
    },
    owner: {},
    description: {
      type: String,
      required: [true, 'the movie must have a description'],
      default: 'none',
    },
    tags: {
      type: [String],
    },
  },
  {
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
    id: false,
    timestamps: true,
  },
);

const Movies = mongoose.model('movies', movieSchema);

module.exports = Movies;
