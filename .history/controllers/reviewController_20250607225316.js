const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const Factory = require('./handlerFactory');

exports.getReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews }
  });
});

exports.getReview = Factory.getone(Review);
exports.setTourAndUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.createReview = Factory.createone(Review);

exports.updateReview = Factory.updateone(Review);

exports.deleteReview = Factory.deleteone(Review);
