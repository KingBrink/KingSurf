import express from 'express'
import bodyParser from 'body-parser'
import { cart } from '../model/index.js'
import { verifyAToken } from '../middleware/AuthenticateUser.js'

const cartRouter = express.Router()

cartRouter.use(bodyParser.json())

cartRouter.get('/',  (req, res) => {
    cart.fetchAllCarts(req, res)
})

cartRouter.get('/:id', (req, res) => {
    cart.fetchCartByID(req, res)
})

cartRouter.post('/add', (req, res) => {
    cart.addCart(req, res)
})

cartRouter.patch('/:id', (req, res) => {
    cart.updateCart(req, res)
})

cartRouter.delete('/:id', (req, res) => {
    cart.deleteCart(req, res)
})

export {
    cartRouter
}
