import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router as userRoute } from './routes/userRoute.js';
import { router as productRoute } from "./routes/productRoute.js";
import { router as cartRoute } from "./routes/cartRoute.js";
import { router as orderRoute } from "./routes/orderRoute.js";
import { router as stripe } from './routes/stripe.js';


const app = express();

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => {
        console.log(err);
    }
);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripe);

app.listen(5000, () => {
    console.log("Server listening on port 5k");
});

