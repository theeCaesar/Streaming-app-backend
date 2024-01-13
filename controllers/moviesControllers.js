const catchAsyncErrors = require('../utils/catchAsyncErrors');
const Users = require('../models/usersModel');
const Movies = require('../models/moviesModel');
const appError = require('../utils/appError');
const multer = require('multer');
const Rooms = require('../models/roomsModel');
const deletefiles = require('../utils/deletefiles');

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video/mp4')) {
    cb(null, true);
  } else {
    cb(new appError('not a video', 400), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/movies/');
  },
  filename: (req, file, cb) => {
    req.body.movieURL = `${Date.now()}-${file.originalname}-${
      req.user._id
    }.mp4`;
    cb(null, req.body.movieURL);
  },
});

const uploader = multer({
  storage,
  fileFilter: multerFilter,
});

exports.saveMovieToStorage = uploader.fields([{ name: 'movie', maxCount: 1 }]);

exports.uploadMovie = catchAsyncErrors(async (req, res, next) => {
  if (req.body.movieURL) {
    newMovie = await Movies.create({
      movieURL: req.body.movieURL,
      movieName: req.body.movieURL,
      owner: {
        _id: req.user._id,
        displayName: req.user.displayName,
        profilePicture: req.user.profilePicture,
      },
    });
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

exports.updateMovie = catchAsyncErrors(async (req, res, next) => {
  if (req.body) {
    delete req.body.owner;

    updatedMovie = await Movies.findOneAndUpdate(
      { _id: req.params.id, 'owner._id': req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
  } else {
    return next(new appError('req body is empty', 400));
  }

  if (!updatedMovie) {
    return next(new appError('movie not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: updatedMovie,
  });
});

exports.deleteMovie = catchAsyncErrors(async (req, res, next) => {
  let deletedMovie;

  deletedMovie = await Movies.findOneAndDelete({
    _id: req.params.id,
    'owner._id': req.user._id,
  });

  if (!deletedMovie) {
    return next(new appError('movie not found', 404));
  }
  if (!Rooms.findOne({ movie: req.params.id }))
    await deletefiles([`public/movies${deletedMovie.movieURL}`], next);

  res.status(204).json({
    status: 'success',
  });
});
