const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movies',
      required: true,
    },
    owner: {},
    history: [],
    state: {
      type: String,
      enum: ['active', 'finished', 'deleted'],
      default: 'active',
    },
  },
  {
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
    id: false,
    timeseries: true,
  },
);

const Rooms = mongoose.model('rooms', roomsSchema);

module.exports = Rooms;
