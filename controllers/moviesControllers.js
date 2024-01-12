const catchAsyncErrors = require('../utils/catchAsyncErrors');
const Users = require('../models/usersModel');
const Movies = require('../models/moviesModel');
const appError = require('../utils/appError');
const multer = require('multer');

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
    req.body.movie = `${Date.now()} ${file.originalname} ${req.user._id}.mp4`;
    cb(null, req.body.movie);
  },
});

const uploader = multer({
  storage,
  fileFilter: multerFilter,
});

exports.saveMovieToStorage = uploader.fields([{ name: 'movie', maxCount: 1 }]);

exports.uploadMovie = catchAsyncErrors(async (req, res, next) => {
  if (req.body.movie) {
    newMovie = await Movies.create({
      movieName: req.body.movie,
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
