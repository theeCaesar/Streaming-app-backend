const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'rooms',
      required: [true, 'message must belong to a room'],
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movies',
      required: [true, 'message must belong to a movie'],
    },
    role: {
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

module.exports = ChatMessages;
