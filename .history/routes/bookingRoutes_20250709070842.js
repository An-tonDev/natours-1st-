const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);

router.use(authController.restrictTo('admin,lead-guide'));
router
  .route('/')
  .get(bookingController.getBookings)
  .get(bookingController.getBooking)
  .post(bookingController.createBookings);
router
  .route('/:id')
  .patch(bookingController.updateBookings)
  .delete(bookingController.deleteBookings);
module.exports = router;
