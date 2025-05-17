import { Router } from "express";
import { restrictTo, protect} from "../controllers/authController.js";
import { getAllOrder, getOrder, createOrder, updateOrder, deleteOrder} from "../controllers/orderController.js";


const router = Router();


//Get Monthly Income
// router
//     .route("/income")
//     .get(protect, restrictTo("admin"), getMonthlyIncome);


// Routes
router
    .route("/")
    .get(protect, restrictTo("admin"), getAllOrder)
    .post(protect, createOrder);

router
    .route("/:userId")
    .get(protect, getOrder)
    .patch(protect, restrictTo("admin"), updateOrder)
    .delete(protect, restrictTo("admin"), deleteOrder);



export {router};