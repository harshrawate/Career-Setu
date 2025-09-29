import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();


connectDB()


const app = express();
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,   
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],          
}));
app.use(express.json()) 


app.get('/', (req, res) => {
  res.send('Welcome to the Career-Setu Backend API')
});

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
