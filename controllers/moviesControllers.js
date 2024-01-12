const catchAsyncErrors = require('../utils/catchAsyncErrors');
const Users = require('../models/usersModel');
const Movies = require('../models/moviesModel');
const appError = require('../utils/appError');
const multer = require('multer');

exports.uploadMovie = catchAsyncErrors(async (req, res, next) => {
  if (req.body.movie) {
    newMovie = await Movies.create(req.body.movie);
  } else {
    return next(new appError('please choose a movie', 400));
  }
  res.status(201).json({
    status: 'success',
    data: {
      movie: newMovie,
    },
  });
});
