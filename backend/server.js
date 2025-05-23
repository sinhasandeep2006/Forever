import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartroute.js'
import orderRouter from './routes/orderroute.js'
//app config 

const app = express()
const Port=process.env.PORT || 5000
connectDB()
connectCloudinary()

//middleware

app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.get('/',(req,res)=>{
    res.send(
        "API WORKING"
    )
})

app.listen(Port,()=>console.log('server started on Port : '+Port));