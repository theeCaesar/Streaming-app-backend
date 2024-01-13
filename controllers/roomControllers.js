const catchAsyncErrors = require('../utils/catchAsyncErrors');
const Users = require('../models/usersModel');
const Movies = require('../models/moviesModel');
const appError = require('../utils/appError');
const Rooms = require('../models/roomsModel');

exports.createRoom = catchAsyncErrors(async (req, res, next) => {
  newRoom = await Rooms.create({
    movie: req.body.movieId,
    owner: {
      _id: req.user._id,
      displayName: req.user.displayName,
      profilePicture: req.user.profilePicture,
    },
  });
  res.status(201).json({
    status: 'success',
    data: {
      roomId: newRoom._id,
    },
  });
});

exports.joinRoom = catchAsyncErrors(async (req, res, next) => {
  room = await Rooms.findById(req.params.id).populate({
    path: 'movie',
  });
  if (!room) {
    return next(new appError('req body is empty', 400));
  }

  res.status(201).json({
    status: 'success',
    data: {
      room,
    },
  });
});
