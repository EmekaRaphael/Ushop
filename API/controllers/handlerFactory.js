import mongoose from "mongoose";
import { APIFeatures } from "../utils/apiFeatures.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const getAll = Model => catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on product
    let filter = {};
    if (req.params.productId) {
        if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
            return next(new AppError("Invalid product ID format", 400));
        }
        filter = { product: req.params.productId };
    }

    // Execute Query
    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const document = await features.query;

    // Handle no results found
    if (document.length === 0) {
        return res.status(200).json({
            status: "success",
            results: 0,
            message: "No documents found",
            data: { items: [] }
        });
    }

    // Send Response
    res.status(200).json({
        status: "success",
        results: document.length,
        data: {
            items: document
        }
    });
});

const getOne = (Model, popOptions, field = "userId") => catchAsync(async (req, res, next) => {
    // Log the received ID for debugging
    console.log(`Received ${field}:`, req.params.id);

    // Validate _id if field is '_id'
    if (field === "_id" && !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new AppError(`Invalid ${field} format.`, 400));
    }

    // Build dynamic query based on field
        let query;
    if (field === "_id") {
        query = Model.findById(req.params.id);
    } else {
        query = Model.findOne({ [field]: req.params[field] });
    }

    if (popOptions) query = query.populate(popOptions);

    const document = await query;

    if (!document) {
        return next(new AppError(`No document found with the given ${field}.`, 404));
    } 

    // Send consistent response
    res.status(200).json({
        status: "success",
        data: { data: document },
    });
});

const createOne = Model => catchAsync(async (req, res, next) => {

    const document = await Model.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: document
        }
    });
});

const updateOne = Model => catchAsync(async (req, res, next) => {

    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!document) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: "Success",
        data: {
            data: document
        }
    });
});

const deleteOne = (Model, field = '_id') => catchAsync(async (req, res, next) => {
    let query;
    
    // Handle deletion by dynamic field, defaulting to `_id`
    if (field === '_id') {
        query = { _id: req.params.id };  // Using the `_id` in case of the default
    } else {
        query = { [field]: req.params[field] };  // Using a custom field like `userId`, `productId`
    }

    // Perform deletion
    const document = await Model.findOneAndDelete(query);

    if (!document) {
        return next(new AppError(`No document found with the given ${field}`, 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});


export {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
};