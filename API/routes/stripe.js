import Stripe from "stripe";
import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();



const router = Router();

const stripe = new Stripe(process.env.STRIPE_SK);

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    });
});



export { router };