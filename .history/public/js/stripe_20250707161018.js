/* eslint-disable */
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { showAlert } from "./alert";

// Prepare Stripe for future use
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export const bookTour = async (tourId) => {
    try{
    // Fetch Checkout session from backend
    const session = await axios(
      `http://127.0.0.1:8000/bookings/checkout-session/${tourId}`
    );

    console.log("Session from backend:", session);
    const stripe=stripePromise
    await stripe.redirectToCheckout({
        sessionId: session.data.session.id
    })
    }catch(err){
        console.log(err)
        showAlert('error',err)
    }
};
