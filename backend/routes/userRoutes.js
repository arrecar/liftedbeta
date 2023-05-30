const express =  require('express');
const { addUser, authUser } = require('../controllers/users');

const router = express.Router();

router.route("/").post(addUser);
router.route("/login").post(authUser);



module.exports = router;