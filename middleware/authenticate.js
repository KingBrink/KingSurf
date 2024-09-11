import {compare} from 'bcrypt'
import { getLoginDb } from '../model/userDb.js'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const checkUser = async (req,res,next)=>{
    const {emailAdd,userPass} = req.body;
    if (!emailAdd || !userPass) {
        return res.status(404).send( "Missing required fields" );
    }
    let data  = (await getLoginDb(emailAdd))
    let hashedPassword = data.userPass
    console.log(data);
    
    let result = await compare(userPass,hashedPassword)
    console.log(result);
    
    if(result){
        // let token = jwt.sign({emailAdd:emailAdd},process.env.SECRET_KEY,{expires:'1h'})
        let token = jwt.sign({
            emailAdd,
            userPass
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        })
        console.log(token)

        req.body.token = token
        next()
    }else{
        res.status(404).send('Password is incorrect')
    }
}

export {checkUser}