import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    userId: { type: String, required: true},
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ]
}, {timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);

export { Cart };