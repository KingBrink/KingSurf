import express from 'express'
import { checkUser } from '../middleware/authenticate.js'
import { fetchUsers, fetchUser , fetchRecentUser, addUser, removeUser, updateUser,loginUser} from '../controller/usersController.js'

const router = express.Router()

router.post('/login',checkUser,loginUser)

router.get('/',fetchUsers)
router.get('/recent',fetchRecentUser)
router.get('/:id',fetchUser)
router.post('/register',addUser)
router.delete('/delete/:id',removeUser)
router.patch('/update/:id',updateUser)



export default router 