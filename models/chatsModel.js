const mongoose = require('mongoose');

const chatMessagesSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'chat must have a message'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'message must belong to a user'],
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'rooms',
      required: [true, 'message must belong to a room'],
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movies',
      required: [true, 'message must belong to a movie'],
    },
    timestamp: Number, //in seconds
  },
  {
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
    id: false,
  },
);

const ChatMessages = mongoose.model('chatMessages', chatMessagesSchema);

module.exports = ChatMessages;
