const exp = require('express');
const authControllers = require('../controllers/authControllers');
const moviesControllers = require('../controllers/moviesControllers');

router = exp.Router();

router
  .route('/')
  .post(
    authControllers.protect,
    moviesControllers.saveMovieToStorage,
    moviesControllers.uploadMovie,
  );
router
  .route('myMovies')
  .get(authControllers.protect, moviesControllers.getMyMovies);

router
  .route('/:id')
  .patch(authControllers.protect, moviesControllers.updateMovie)
  .delete(authControllers.protect, moviesControllers.deleteMovie);

module.exports = router;
