const express =  require('express');
const { addUser } = require('../controllers/users');

const router = express.Router();

router.route('/').post();

router.route("/").post(addUser);

module.exports = router;