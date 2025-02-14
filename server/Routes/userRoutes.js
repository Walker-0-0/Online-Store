import express from 'express'
import User  from '../Models/UserModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import protect from '../Middleware/AuthMiddleWare.js'
const userRoutes=express.Router()
//Login
userRoutes.post("/login",asyncHandler(async (req,res) =>{
     const {email,password}=req.body
     const user=await User.findOne({email})
     if(user && (await user.matchPassword(password))){
         res.json(
             {
                 _id:user._id,
                 name:user.name,
                 email:user.email,
                 isAdmin:user.isAdmin,
                 token:generateToken(user._id),
                 createAt:user.createAt

             }
         )
    
     }
     else{
         res.status(401)
         throw new Error("Incorrect email or password")
     }
}))

// REGISTER
userRoutes.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);


// Profile
userRoutes.get(
    "/profile",
    protect,
    asyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
  
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        });
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    })
  );

// UpdateProfile
userRoutes.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    user.email=req.body.email || user.email
    user.name=req.body.name || user.name
    if(user.password){
      user.password=req.body.password
    }
    const updateUser=await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      createdAt: updateUser.createdAt,
      token: generateToken(updateUser._id),
    }
    )

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default userRoutes