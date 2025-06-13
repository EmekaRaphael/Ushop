import Stripe from "stripe";
import { Router } from "express";
import dotenv from "dotenv";


dotenv.config();

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SK);

router.post("/payment", async (req, res) => {
    try {
        const charge = await stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        });
        res.status(200).json(charge);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export { router };

// router.post("/payment", (req, res) => {
//     stripe.charges.create({
//         source: req.body.tokenId,
//         amount: req.body.amount,
//         currency: "usd"
//     }, (stripeErr, stripeRes) => {
//         if(stripeErr){
//             res.status(500).json(stripeErr);
//         } else {
//             res.status(200).json(stripeRes);
//         }
//     });
// });