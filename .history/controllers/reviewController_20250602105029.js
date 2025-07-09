const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    data: { reviews }
  });
  next();
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  res.status(200).json({
    status: 'status',
    data: {
      review
    }
  });
  next();
});

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: review
  });
  next();
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body);

  if (!review) {
    return next(new AppError('review with this ID was not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
  next();
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return next(new AppError('this particular review does not exist', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
  next();
});
