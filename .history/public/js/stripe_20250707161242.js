/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alert";

// no import of `@stripe/stripe-js`

export const bookTour = async (tourId) => {
  try {
    // Fetch Checkout session from backend
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    console.log("Session from backend:", session);

    // Directly use global Stripe
    const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error(err);
    showAlert("error", err.message);
  }
};
