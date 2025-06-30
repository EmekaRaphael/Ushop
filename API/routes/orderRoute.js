import { Router } from "express";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken.js";
import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";


const router = Router();

//CREATE
router.post("/", verifyToken, async (req, res) =>{
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            }, 
            {
                new: true
            }
        );

        res.status(200).json(updatedOrder);
    } catch(err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        return res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1 ));

  try {
    const income = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: previousMonth }, 
                ...(productId && {
                  products: { $elemMatch: {productId} }
                })
            },
        },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
        },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// GET MONTHLY SALES
router.get("/monthly-sales", verifyTokenAndAdmin, async (req, res) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  try {
    const orders = await Order.find({ createdAt: { $gte: startOfMonth } });

    let totalQuantity = 0;

    for (const order of orders) {
      for (const item of order.products) {
        totalQuantity += item.quantity;
      }
    }

    res.status(200).json({ totalSold: totalQuantity });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MONTHLY COST
router.get("/monthly-cost", verifyTokenAndAdmin, async (req, res) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  try {
    const orders = await Order.find({ createdAt: { $gte: startOfMonth } });

    let totalCost = 0;

    for (const order of orders) {
      for (const item of order.products) {
        const product = await Product.findById(item.productId);
        if (product) {
          totalCost += product.price * item.quantity;
        }
      }
    }

    res.status(200).json({ totalCost });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//GET MONTHLY SALES STATS
router.get("/monthly-sales-stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const salesStats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      { $unwind: "$products" },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSold: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json(salesStats);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MONTHLY COST STATS
router.get("/monthly-cost-stats", verifyTokenAndAdmin, async (req, res) => {
  const now = new Date();
  const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const orders = await Order.find({ createdAt: { $gte: previousMonth } });

    const costStats = {};

    for (const order of orders) {
      const orderMonth = order.createdAt.getMonth() + 1;

      for (const item of order.products) {
        const product = await Product.findById(item.productId);
        if (!product) continue;

        if (!costStats[orderMonth]) costStats[orderMonth] = 0;
        costStats[orderMonth] += product.price * item.quantity;
      }
    }

    const sorted = Object.keys(costStats)
      .sort()
      .map((month) => ({ month: parseInt(month), totalCost: costStats[month] }));

    res.status(200).json(sorted);
  } catch (err) {
    res.status(500).json(err);
  }
});

export {router};