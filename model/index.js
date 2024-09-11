import { Users } from "./Users.js";
import { Products } from "./Products.js";
import { Cart } from "./cart.js";

const cart = new Cart()
const users = new Users()
const products = new Products()

export { 
    users,
    products,
    cart
}
