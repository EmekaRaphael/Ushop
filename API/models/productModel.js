import mongoose, {Schema} from "mongoose";

const productSchema = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        img: { type: String, required: [true, "A product must have an image"] },   
        categories: { type: Array },
        size: { type: Array, required: true },
        color: { type: Array, required: true },
        price: { type: Number, required: true },
        inStock: { type: Boolean, default: true }
    }, 
    {Timestamp: true}
);


const Product = mongoose.model("Product", productSchema);

export {Product};