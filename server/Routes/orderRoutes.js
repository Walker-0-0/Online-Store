import express from "express"
import asyncHandler from "express-async-handler"
import protect from "../Middleware/AuthMiddleWare.js"
import Order from "../Models/OrderModel.js"

const orderRoutes=express.Router()


//Create orders
orderRoutes.post(
    "/",
    protect,
    asyncHandler(async(req,res)=>{
        const {
            orderItems,
            shippingAddress,
            paymentMETHOD,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        }=req.body
        if(orderItems && orderItems.length === 0){
            res.status(400)
            throw new Error("No order items")
            return;
        }
        else{
            const order=new Order({
             orderItems,
             user:req.user._id,
             shippingAddress,
             paymentMETHOD,
             itemsPrice,
             taxPrice,
             shippingPrice,
             totalPrice

        })
        const createOrder =await order.save()
        res.status(201).json(createOrder)
      }
    })

 

)

// USER LOGIN ORDERS
orderRoutes.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);
  })
);

// GET ORDER BY ID
orderRoutes.get(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
      );
  
      if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("Order Not Found");
      }
    })
  );

export default orderRoutes


// ORDER IS PAID
orderRoutes.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isPaid=true
      order.paidAt=Date.now()
      order.paymentResult={
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.email_address
      }
      const updatedOrder=await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);


