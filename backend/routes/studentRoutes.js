const express =  require('express');
const { addStudent, getStudents, getStudentById, getStudentByEmail, updateStudent, deleteStudent} = require('../controllers/studentsController');

const router = express.Router();

router.route("/create").post(addStudent);
router.route("/").get(getStudents);
router.route("/:id").get(getStudentById).put(updateStudent).delete(deleteStudent);
router.route("/email/:email").get(getStudentByEmail);


module.exports = router;