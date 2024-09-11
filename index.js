import express from 'express'
import userRouter from './routes/usersRouter.js'
import productRouter from './routes/productsRouter.js'
import cors from 'cors'
let port = process.env.PORT  || 3001

const app = express()
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next()
})
app.use(express.json())

app.use(express.static('public'))
app.use('/products',productRouter)
app.use('/users',userRouter)

app.listen(port,()=>{
    console.log('http://localhost:'+port)
})