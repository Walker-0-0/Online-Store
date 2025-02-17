import express from 'express'
import Product  from '../Models/ProductModel.js'
import asyncHandler from 'express-async-handler'
import protect from '../Middleware/AuthMiddleWare.js'
const productRoute=express.Router()

//Get all products
productRoute.get("/",asyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
)

//Get single product

productRoute.get("/:id",asyncHandler(async (req,res) =>{
    const product=await Product.findById(req.params.id)
    if(product){
       res.json(product)
    }
    else{
        res.status(404)
        throw new Error('product not found')

    }
}))

export default productRoute

// PRODUCT REVIEW
productRoute.post(
    "/:id/review",
    protect,
    asyncHandler(async (req, res) => {
      const { rating, comment } = req.body;
      const product = await Product.findById(req.params.id);
  
      if (product) {
        const alreadyReviewed = product.reviews.find(
          (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
          res.status(400);
          throw new Error("Product already Reviewed");
        }
        const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id,
        };
  
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
  
        await product.save();
        res.status(201).json({ message: "Reviewed Added" });
      } else {
        res.status(404);
        throw new Error("Product not Found");
      }
    })
  );