const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'a booking must have a tour']
  },
  User: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'a booking must belong to a user']
  },
  price: {
    type: Number,
    required: [true, 'booking must have a price']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    dafault: true
  }
});

bookingSchema.pre(/^find^/, function(next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  });
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
