/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alert";

// no import of `@stripe/stripe-js`
const stripe = Stripe('pk_test_51RgpXFRkgaQO83o0xBM4TVbLnoFKpOWSRUS4s0yAGO8Lveff6kkJw1GgiwEaPLQA2n1ltk3fgqyKnV4HnqSKLV8u00x9bPKzrB');

export const bookTour = async (tourId) => {
  try {
    // Fetch Checkout session from backend
    const session = await axios(
      `http://127.0.0.1:8000/bookings/checkout-session/${tourId}`
    );

    //console.log("Session from backend:", session);

    // Directly use global Stripe

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error(err);
    showAlert("error", err.message);
  }
};
