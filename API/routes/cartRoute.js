import { Router } from "express";
import { restrictTo, protect} from "../controllers/authController.js";
import { getAllCart, getCart, createCart, updateCart, deleteCart } from "../controllers/cartController.js";

const router = Router();


// Routes
router
    .route("/")
    .get(protect, restrictTo("admin"), getAllCart)
    .post(protect, createCart);

router
    .route("/:userId")
    .get(protect, getCart)
    .patch(protect, updateCart)
    .delete(protect, deleteCart);

export {router};