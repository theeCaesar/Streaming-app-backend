const mongoose = require('mongoose');
// const deletefiles = require('../utils/deletefiles');
// const Rooms = require('../models/roomsModel');

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

// movieSchema.post('findOneAndDelete', async function () {
//   if (Rooms.findOne({ movie: this.id }))
//     await deletefiles([`public/movies/${this.movieURL}`]);
// });

const Movies = mongoose.model('movies', movieSchema);

module.exports = Movies;
