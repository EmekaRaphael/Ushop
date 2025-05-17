import { Router } from "express";
import { restrictTo, protect} from "../controllers/authController.js";
import { createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { Product } from "../models/productModel.js";


const router = Router();

// ✅ Get a product by ID
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
        console.log(err);
    }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let products;

        if(qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(1);
        } else if(qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Routes
router
    .route("/")
    .post(protect, restrictTo("admin"), createProduct);

router
    .route("/:id")
    .patch(protect, restrictTo("admin"), updateProduct)
    .delete(protect, restrictTo("admin"), deleteProduct);



export {router};