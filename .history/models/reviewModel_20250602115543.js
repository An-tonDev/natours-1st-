const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'review cannot be blank'],
      trim: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    tour: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'review must belomg to a tour']
      }
    ],
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      }
    ]
  },
  {
    toJSON: { virturals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
