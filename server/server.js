import express from "express";
import dotenv from "dotenv"
import connectDatabase from "./config/MongoDb.js";
import importData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Error.js";
import userRoutes from "./Routes/userRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import cors from "cors"
dotenv.config()
connectDatabase()
const app=express();
app.use(express.json())
app.use(cors())
app.use("/api/import",importData)
app.use("/api/products",productRoute)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)
app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use(notFound)
app.use(errorHandler)

const Port=process.env.PORT || 5000





app.listen(Port,console.log(`server running at ${Port}`));




