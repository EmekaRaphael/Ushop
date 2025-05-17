import { Cart } from "../models/cartModel.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js";


const getAllCart = getAll(Cart);
const getCart = getOne(Cart, null, "userId");
const createCart = createOne(Cart);
const updateCart = updateOne(Cart);
const deleteCart = deleteOne(Cart, null, "userID");


export {
    getAllCart,
    getCart,
    createCart,
    updateCart,
    deleteCart
};