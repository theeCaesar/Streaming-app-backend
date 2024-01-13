const catchAsyncErrors = require('../utils/catchAsyncErrors');
const Users = require('../models/usersModel');
const Movies = require('../models/moviesModel');
const appError = require('../utils/appError');
const Rooms = require('../models/roomsModel');
const ChatMessages = require('../models/chatsModel');
const APIFeatures = require('../utils/APIFeatures');

exports.saveChatMessage = catchAsyncErrors(async (message, user, room) => {
  await save.create({
    message,
    room: room._id,
    user: user._id,
    movie: room.movie,
  });
});

exports.chatHistory = catchAsyncErrors(async (req, res, next) => {
  await ChatMessages.findOne({ room: req.body.roomId });
});
