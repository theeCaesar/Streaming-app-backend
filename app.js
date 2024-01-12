const exp = require('express');

const rateLimit = require('express-rate-limit');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('ahpp');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorControllers = require('./controllers/errorControllers');

const app = exp();

//security
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'to many requests from this IP, try again later',
});

// app.use('/api', limiter)

app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());
app.use(exp.json({ limit: '10Kb' }));

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// app.enable('trust proxy');
app.use(cors());
app.options('*', cors());
app.use(exp.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log('working');
  res.send({ jason: 'working' });
});

app.all('*', (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl}`, 404));
});

app.use(errorControllers);

module.exports = app;
