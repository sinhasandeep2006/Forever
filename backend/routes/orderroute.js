import express from 'express';

import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,UserOrders,updateStatus,verifyStrip,verifyRazorpay} from '../controllers/ordercontroller.js';

import adminAuth from '../middleware/adminAuth.js'
import authUser from './../middleware/auth.js';

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)
orderRouter.post('/razorpay',authUser, placeOrderRazorpay)

//iser Features
orderRouter.post('/userorders',authUser,UserOrders)

//verify payment
orderRouter.post('/verifyStrip',authUser,verifyStrip)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)




export default orderRouter