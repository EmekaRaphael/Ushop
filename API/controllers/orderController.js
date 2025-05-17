import { Order } from "../models/OrderModel.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js";


const getAllOrder = getAll(Order);
const getOrder = getOne(Order);
const createOrder = createOne(Order);
const updateOrder = updateOne(Order);
const deleteOrder = deleteOne(Order);

//Get Monthly Income
// const getMonthlyIncome = async (req, res) => {
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); // Last month
//     const previousMonth = new Date(date.setMonth(date.getMonth() - 1)); // Month before last

//     try {
//         const income = await Order.aggregate([
//             // Stage 1: Match orders created in the last two months
//             {
//                 $match: {
//                     createdAt: {
//                         $gte: previousMonth, // Orders from the previous month onwards
//                         $lt: new Date(), // Exclude orders from the current month onwards
//                     },
//                 },
//             },

//             // Stage 2: Group by year and month, and calculate total income
//             {
//                 $group: {
//                     _id: {
//                         year: { $year: "$createdAt" }, // Extract year from createdAt
//                         month: { $month: "$createdAt" }, // Extract month from createdAt
//                     },
//                     totalIncome: { $sum: "$amount" }, // Sum the amount field
//                 },
//             },

//             // Stage 3: Sort by year and month
//             {
//                 $sort: { "_id.year": 1, "_id.month": 1 }, // 1 = ascending order
//             },

//             // Stage 4: Format the output
//             {
//                 $project: {
//                     _id: 0, // Exclude the default _id field
//                     year: "$_id.year",
//                     month: "$_id.month",
//                     totalIncome: 1, // Include the totalIncome field
//                 },
//             },
//         ]);

//         // Send the response
//         res.status(200).json(income);
//     } catch (err) {
//         console.error("Error calculating monthly income:", err); // Log the error for debugging
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


export {
    getAllOrder,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    // getMonthlyIncome
};
