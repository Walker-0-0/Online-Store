import express from "express"
import User from "./Models/UserModel.js"
import users from "./data/users.js"
import Product from "./Models/ProductModel.js"
import products from "./data/Products.js"
const importData=express.Router()
importData.post("/user",async (req,res) =>{
    await User.remove({})
    const importUser =await User.insertMany(users)
    res.send(importUser)
})

importData.post("/products",async (req,res) =>{
    await Product.remove({})
    const importProducts =await Product.insertMany(products)
    res.send(importProducts)
})

export default importData