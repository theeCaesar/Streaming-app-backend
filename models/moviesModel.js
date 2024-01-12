const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: [true, 'the movie must have a name'],
    },
    owner: {},
  },
  {
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
    id: false,
  },
);

const Movies = mongoose.model('movies', movieSchema);

module.exports = Movies;
