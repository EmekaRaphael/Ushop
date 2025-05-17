import { Product } from "../models/productModel.js";
import { createOne, updateOne, deleteOne } from "./handlerFactory.js";


const createProduct = createOne(Product);
const updateProduct = updateOne(Product);
const deleteProduct = deleteOne(Product);


export {
    createProduct,
    updateProduct,
    deleteProduct
};