import express from "express";
import dotenv from 'dotenv'
import connectDB from "./db/connectDB";
import userRoute from './routes/user.route'
import cookieParser from "cookie-parser";
import cors from 'cors'
import restaurantRouter from "./routes/restaurant.routes"
import MenuRouter from "./routes/menu.route"
import path from "path";


dotenv.config()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
const app = express()

const PORT = process.env.PORT || 3000

const DIRNAME = path.resolve();



//* default middleware

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(cors(corsOptions))

// * apis

app.use('/api/v1/user', userRoute)
app.use('/api/v1/restaurant', restaurantRouter)
app.use('/api/v1/menu', MenuRouter)



app.listen(PORT, () => {
    connectDB()
    //(`server running on http://localhost:${PORT}/`);
    
})

app.use(express.static(path.join(DIRNAME,"/client/dist")));

app.use((_,res)=>{
    res.sendFile(path.resolve(DIRNAME,'client',"dist","index.html"));
});

