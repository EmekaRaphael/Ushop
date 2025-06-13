import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: { 
                    type: Number, 
                    default: 1,
                    min: [1, "Quantity must be at least 1"] 
                }
            }
        ],
        amount: { 
            type: Number, 
            required: true, 
            min: [0, "Amount must be a positive number"] 
        },
        address: { 
            type: Object, 
            required: true 
        },
        status: { 
            type: String, 
            default: "pending", 
            enum: ["pending", "completed", "canceled"] 
        }
    }, 
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export { Order };
