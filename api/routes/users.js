import express from "express";
const router=express.Router();
import {updateUser,deleteUser,getUser,getUsers} from "../controllers/user.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";


// router.get('/checkAuthentication',verifyToken,(req,res,next)=>{
//     res.send('you are logged in')
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put("/:id",verifyUser,updateUser);
//DELETE
router.delete("/:id",verifyUser,deleteUser);
//GET
router.get("/:id",verifyUser,getUser);
//GETALL
router.get("/",verifyAdmin,getUsers);

export default router;