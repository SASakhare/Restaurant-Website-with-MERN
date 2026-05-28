import express from "express";
import dotenv from 'dotenv'
import connectDB from "./db/connectDB";
import userRoute from './routes/user.route'
import cookieParser from "cookie-parser";
import cors from 'cors'
import restaurantRouter from "./routes/restaurant.routes"


dotenv.config()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
const app = express()

const PORT = process.env.PORT || 3000

//* default middleware

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(cors(corsOptions))

// * apis

app.use('/api/v1/user', userRoute)
app.use('/api/v1/restaurant', restaurantRouter)




app.listen(PORT, () => {
    connectDB()
    console.log(`server running on http://localhost:${PORT}/`);

})


