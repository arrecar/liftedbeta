const express =  require('express');
const { addGrade, getGrades, getGradeById, getGradeByStudent, getGradeByTeacher, updateGrade, deleteGrade } = require('../controllers/gradesController');

const router = express.Router();

router.route("/create").post(addGrade);
router.route("/").get(getGrades);
router.route("/:id").get(getGradeById).put(updateGrade).delete(deleteGrade);
router.route("/student/:student").get(getGradeByStudent);
router.route("/teacher/:teacher").get(getGradeByTeacher);


module.exports = router;