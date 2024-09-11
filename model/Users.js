import { connection as db } from '../config/config.js'
import { createToken } from '../middleware/AuthenticateUser.js'
import { compare, hash } from 'bcrypt'

class Users {
    fetchUsers(req, res) {
        try {
            const strQry = `
                            SELECT *
                            FROM users;
                            `
            db.query(strQry, (err, results) => {
                if (err) {
                    res.json({
                        status: 404,
                        err
                    })
                }else{

                    res.json({
                        status: res.statusCode,
                        results
                    })
                }
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    fetchUser(req, res) {
        try {
            const strQry = `
        SELECT *
        FROM users
        WHERE user_id = ${req.params.id};
        `
            db.query(strQry, (err, result) => {
                if (err) throw new Error('Issue when retrieving a user.')
                res.json({
                    status: res.statusCode,
                    result: result[0]
                })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: 'Please try again later.'
            })
        }
    }
    async registerUser(req, res) {
        try {
            let data = req.body
            data.user_password = await hash(data.user_password, 12)
            // Payload
            let user = {
                user_email: data.user_email,
                user_password: data.user_password
            }
            let strQry = `
        INSERT INTO users
        SET ?;
        `
            db.query(strQry, [data], (err) => {
                if (err) {
                    res.json({
                        status: res.statusCode,
                        msg: 'This email has already been taken'
                    })
                } else {
                    const token = createToken(user)
                    res.json({
                        token,
                        msg: 'You are now registered.'
                    })
                }
            })
        } catch (e) {
            res.json({
                status: 404,
                err: e.message
            })
        }
    }
    async updateUser(req, res) {
        try {
            let data = req.body
            if (data.user_password) {
                data.user_password = await hash(data.user_password, 12)
            }
            const strQry = `
        UPDATE users
        SET ?
        WHERE user_id = ${req.params.id}
        `
            db.query(strQry, [data], (err) => {
                if (err) throw new Error('Unable to update a user')
                res.json({
                    status: res.statusCode,
                    msg: 'The user record was updated.'
                })
            })
        } catch (e) {
            res.json({
                status: 400,
                err: e.message
            })
        }

    }
    deleteUser(req, res) {
        try {
            const strQry = `
        DELETE FROM users
        WHERE user_id = ${req.params.id};
        `
            db.query(strQry, (err) => {
                if (err) throw new Error('To delete a user, please review your delete query.')
                res.json({
                    status: res.statusCode,
                    msg: 'A user\'s information was removed.'
                })
            })
        } catch (e) {
            res.json({
                status: 404,
                err: e.message
            })
        }
    }
    async login(req, res) {
        try {
            const { user_email, user_password } = req.body
            const strQry = `
        SELECT *
        FROM users
        WHERE user_email = '${user_email}';
        `
            db.query(strQry, async (err, result) => {
                if (err) throw new Error('To login, please review your query.')
                if (!result?.length) {
                    res.json(
                        {
                            status: 401,
                            msg: 'You provided a wrong email.'
                        }
                    )
                } else {
                    const isValidPass = await compare(user_password, result[0].user_password)
                    if (isValidPass) {
                        const token = createToken({
                            user_email,
                            user_password
                        })
                        res.json({
                            status: res.statusCode,
                            token,
                            result: result[0]
                        })
                    } else {
                        res.json({
                            status: 401,
                            msg: 'Invalid password or you have not registered'
                        })
                    }
                }
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
}
export {
    Users
}