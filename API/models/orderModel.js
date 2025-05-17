import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: { 
                    type: Number, 
                    default: 1,
                    min: [1, "Quantity must be at least 1"] // Minimum quantity validation
                }
            }
        ],
        amount: { 
            type: Number, 
            required: true, 
            min: [0, "Amount must be a positive number"] // Positive amount validation
        },
        address: { 
            type: Object, 
            required: true 
        },
        status: { 
            type: String, 
            default: "pending", 
            enum: ["pending", "completed", "canceled"] // Restrict to specific statuses
        }
    }, 
    { timestamps: true }
);

// Index for improved query performance
// orderSchema.index({ userId: 1, createdAt: 1 });

const Order = mongoose.model("Order", orderSchema);

export { Order };
