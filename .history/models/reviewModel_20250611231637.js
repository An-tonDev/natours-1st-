/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const Tour= require('./tourModel')

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
  this.populate([
    {
      path: 'user',
      select: 'name photo'
    }
  ]);
  next();
});

reviewSchema.statics.calcAverageRatings= async function(tourId){
  const stats= await this.aggregate([
    {
      $match: {tour:tourId}
    },{
      $group: {
        _id:'$tour',
        nRating:{$sum:1},
        avgRating:{$avg:'$rating'}
      }
    }
  ])
  console.log(stats)

  await Tour.findByIdAndUpdate(tourId,{
    ratingsQuantity:stats[0].nRating,
    ratingsAverage:stats[0].avgRating
  })
}

reviewSchema.pre(/^findOneAnd/, async function(next){
  this.r=await this.findOne()
})
reviewSchema.post(/^findOneAnd/, async function(){
  await this.r.constructor.calcAverageRatings(this.r.tour)
})



reviewSchema.post('save', function(){
  this.constructor.calcAverageRatings(this.tour)
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
