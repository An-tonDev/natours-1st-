const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user'
  });
  if (!tour) {
    return next(new AppError('there is no tour with that name', 404));
  }
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'log into your accounnt'
  });
};
exports.getSignUpForm = (req, res) => {
  res.status(200).render('signUp', {
    title: 'Please Signup'
  });
};

exports.getMeInfo = (req, res) => {
  res.status(200).render('account', {
    title: 'Personal info'
  });
};
exports.getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.findById({ user: req.user.id });
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  res.status(200).render('overview', {
    title: 'my bookings',
    tours
  });
});
exports.updateInfo = catchAsync(async (req, res, next) => {
  const updateduser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).render('account', {
    title: 'Personal info',
    user: updateduser
  });
});
