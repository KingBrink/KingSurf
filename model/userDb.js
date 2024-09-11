import { pool } from "../config/config.js";

const getUsersDb = async ()=>{
    let [data] = await pool.query('SELECT * FROM Users')
    return data
}

const getUserDb = async (id)=>{
    let [[data]] = await pool.query(`
        SELECT *
        FROM Users
        WHERE userID =? `,[id])
    return data
}
const getLoginDb = async (emailAdd)=>{
    let [[data]] = await pool.query(`
        SELECT *
        FROM Users
        WHERE emailAdd =? `,[emailAdd])
    return data?data:''
}

const addUserDb = async(firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile)=>{
    await pool.query(`
        INSERT INTO Users(firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile)
        VALUES (?,?,?,?,?,?,?,?)`,[firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile])
}

const deleteUserDb = async (id)=>{
    await pool.query(`
        DELETE
        FROM Users
        WHERE userID = ?`,[id])
}

const recentUsersDb = async()=>{
    let [data] = await pool.query(`
    SELECT *
    FROM Users
    ORDER BY userID desc`)
    return data
}

const editUsersDb = async (id,firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile)=>{
    let [data] = await pool.query(`
        UPDATE Users
        SET firstName=?,lastName=?,userAge=?,Gender=?,userRole=?,emailAdd=?,userPass=?,userProfile=?
        WHERE userID = ?`,[firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile,id])
    return data
}


export {getUsersDb,getUserDb, addUserDb, editUsersDb,deleteUserDb,recentUsersDb,getLoginDb}