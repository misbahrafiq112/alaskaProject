import express from 'express'

const app = express();
import router from './routes/mainRouter.js'
import cors from "cors"
import dotenv from 'dotenv'


dotenv.config()
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send("heelo")
})



app.use(router)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server listen PORT on ${PORT}`)
})