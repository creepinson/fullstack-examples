import Stripe from 'stripe'
export const stripe = new Stripe(process.env.stripeSecretKey!, {
  apiVersion: '2020-03-02',
})
