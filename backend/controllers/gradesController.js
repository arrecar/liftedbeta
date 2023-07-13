const asyncHandler = require('express-async-handler');
const Grade = require('../models/gradesmodel');

const addGrade = asyncHandler(async(req, res) => {
	const { _id, unit, grade, student, teacher, comments } = req.body;

	const idExists = await Grade.findOne({_id});

	if (idExists) {
		res.status(400);
		throw new Error('Id already exists');
	}

	const grades = await Grade.create({
		_id,
		unit,
		grade,
		student,
		teacher,
		comments,
	});

	if (grades){
		res.status(201).json({
			_id:grades._id,
			unit:grades.unit,
			grade:grades.grade,
			student:grades.student,
			teacher:grades.teacher,
			comments:grades.comments,
		});
	} else {
		res.status(400);
		throw new Error('Unable to create grade');
	}
});

const getGrades = asyncHandler(async(req, res) => {
	const grades = await Grade.find();
	res.json(grades);
});

const getGradeById = asyncHandler(async(req, res) => {
	const{id} = req.params;
	
	const gradeExists = await Grade.findeOne({id});

	if (gradeExists) {
		res.json(gradeExists);
	} else {
		res.status(400).json({message: 'Grade not found/Invalid Id'});
	}
});

const getGradeByStudent = asyncHandler(async(req,res) => {
	const{student} = req.params;

	const gradeExists = await Grade.find({student: student});

	if (gradeExists) {
		res.json(gradeExists);
	} else {
		res.status(400).json({message: 'Grade not found/Student Id invalid'});
	}
});

const getGradeByTeacher = asyncHandler(async(req, res) => {
	const {teacher} = req.params;
	
	const gradeExists = await Grade.find({teacher: teacher});

	if (gradeExists){
		res.json(gradeExists);
	} else {
		res.status(400).json({message: 'Grade not found/Teacher email invalid'});
	}
});

const updateGrade = asyncHandler(async(req, res) => {
	const {id} = req.params;

	const gradeExists = await Grade.find({_id: id});

	if (gradeExists){
		gradeExists.unit = unit;
		gradeExists.grade = grade;
		gradeExists.student = student;
		gradeExists.teacher = teacher;
		gradeExists.comments = comments;
		
		const updateGrade = await gradeExists.save();
		res.json(updateGrade);
	} else {
		res.status(400).json({message: 'Grade not found'});
	}
});

const deleteGrade = asyncHandler(async(req, res) => {
	const {id} = req.params;
	const gradeExists = await Grade.findOne({_id: id});

	if (gradeExists) {
		await gradeExists.deleteOne({_id: id});
		res.json({message: 'Grade deleted'});
	} else {
		res.status(400);
		throw new Error('Grade not found');
	}
});

module.exports = { addGrade, getGrades, getGradeById, getGradeByStudent, getGradeByTeacher, updateGrade, deleteGrade};