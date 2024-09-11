import { log } from "console";
import { getUsersDb, getUserDb, addUserDb, editUsersDb,deleteUserDb,recentUsersDb, getLoginDb} from "../model/userDb.js";
import {hash} from 'bcrypt'

const fetchUsers = async (req,res)=>{
    try{
        
        res.status(202).json(await getUsersDb())
    } catch(err){
        res.status(404).json({err:"There is an issue with fetching users"})
        throw err
    }
}

const fetchUser = async (req,res)=>{
    try{
        
        res.status(202).json(await getUserDb(req.params.id))
    } catch(err){
        res.status(404).json({err:"There is an issue with fetching single user information"})
        throw err
    }
}

const fetchRecentUser = async (req,res)=>{
    try{
        
        res.status(202).json(await recentUsersDb())
    } catch(err){
        res.status(404).json({err:"There has been an issue with fetching the recent user"})
        throw err
    }
}

const addUser = async (req,res)=>{
    try{
        let {firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile} = req.body

        if (!firstName || !lastName || !userAge || !Gender || !emailAdd || !userPass) {
            return res.status(400).json({err:"Missing required fields" });
        }
        else {
            let oldEmailAdd = (await getLoginDb(emailAdd)).emailAdd
            
            if(emailAdd == oldEmailAdd){
                return res.status(400).json({message:"Email already exists" });
            }

            hash(userPass,10,async (err,hashedP)=>{
                if(err){
                    console.log(err)
                }    
                await addUserDb(firstName,lastName,userAge,Gender,userRole,emailAdd,hashedP,userProfile)
            })
            res.status(202).json({message:"User created successfully"})

            
        }
    } catch(err){
        res.status(404).json({err:"There is an issue with creating a new user"})
        throw err
    }
}

const removeUser = async (req,res)=>{
    try{
        await deleteUserDb(req.params.id)
        res.status(202).json({message:"User deleted successfully"})
    } catch(err){
        res.status(404).json({err:"There is an issue with deleting a user"})
        throw err
    }
}

const updateUser = async (req,res)=>{
    let {firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile} = req.body
    try{
        let user = await getUserDb(req.params.id)

        firstName? firstName=firstName : firstName = user.firstName
        lastName? lastName=lastName : lastName = user.lastName
        userAge? userAge=userAge : userAge = user.userAge
        Gender? Gender=Gender : Gender = user.Gender
        userRole? userRole=userRole : userRole = user.userRole
        emailAdd? emailAdd=emailAdd : emailAdd = user.emailAdd
        userProfile? userProfile=userProfile : userProfile = user.userProfile
        if(userPass){
            hash(userPass,10,async (err,hashedP)=>{
                if(err){
                    console.log(hashedP)
                }    
                userPass = hashedP
                console.log(userPass);
                
                await editUsersDb(req.params.id,firstName,lastName,userAge,Gender,userRole,emailAdd,hashedP,userProfile)
            })
            
        }else{
            userPass = user.userPass
            console.log(userPass);
            await editUsersDb(req.params.id,firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile)
        }
        res.status(202).json({message:"User updated successfully"})
    }catch(err){
        res.status(404).json({err:"There is an issue with updating the user"})    
        throw err
    }
}


const loginUser = (req,res)=>{
    try{
        res.status(202).json({
            message:"User logged in successfully",
            token:req.body.token
        })
    } catch(err){
        res.status(404).json({err:"There is an issue with logging in the user"})
    }
}
export {fetchUsers, fetchUser, fetchRecentUser, addUser, removeUser, updateUser, loginUser}