const express =  require('express');
const { addUser, authUser, getUsers, getUserByEmail, updateUser, deleteUser } = require('../controllers/usersController');

const router = express.Router();

router.route("/create").post(addUser);
router.route("/login").post(authUser);
router.route("/").get(getUsers);
router.route("/:email").get(getUserByEmail)
router.route("/:id").put(updateUser).delete(deleteUser);



module.exports = router;