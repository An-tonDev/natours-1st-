/* eslint-disable import/no-extraneous-dependencies */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');
const User = require('../models/userModel');

const createBookingCheckout = async session => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;

  // Fetch line items
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 1
  });

  const price = lineItems.data[0].amount_total / 100;

  await Booking.create({ tour, user, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};

exports.createBookings = factory.createOne(Booking);
exports.getBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);

exports.updateBookings = factory.updateOne(Booking);
exports.deleteBookings = factory.deleteOne(Booking);
