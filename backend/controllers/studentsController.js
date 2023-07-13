const asyncHandler = require('express-async-handler');
const Student = require('../models/studentsmodel');

const addStudent = asyncHandler(async (req, res) => {
	const {_id, firstname, lastname, parentEmail, parent2Email} = req.body;
	
	const idExists = await Student.findOne({_id});

	if (idExists) {
		res.status(400);
		throw new Error('Id already exists');
	}

	const student = await Student.create({
		_id,
		firstname,
		lastname,
		parentEmail,
		parent2Email,
	});

	if (student) {
		res.status(201).json({
			_id:student._id,
			firstname:student.firstname,
			lastname:student.lastname,
			parentEmail:student.parentEmail,
			parent2Email:student.parent2Email,
		});
	} else {
		res.status(400)
		throw new Error('Unable to create student')
	}
	});


const getStudents = asyncHandler(async(req,res) => {
	const students = await Student.find();
	res.json(students)
});

const getStudentById = asyncHandler(async(req, res) => {
	const {id} = req.params;

	const studentExists = await Student.findOne({_id: id});

	if (studentExists){
		res.json(studentExists);
	} else {
		res.status(400).json({message: 'Student not found/Invalid Id'})
	}
});

const getStudentByEmail = asyncHandler(async(req, res) => {
	const {email} = req.params;
	
	const studentExists = await Student.find({parentEmail:email});
	const studentExists2 = await Student.find({parent2Email:email});

	if (studentExists){
		res.json(studentExists);
	} else if (studentExists2){
		res.json(studentExists2);
	} else {
		res.status(400).json({message: 'No students related to the email address'})
	}
});

const updateStudent = asyncHandler(async(req, res) => {
	const {id} = req.params;
	const studentExists = await Student.findOne({_id:id});

	const {firstname, lastname, parentEmail, parent2Email} = req.body;

	if (studentExists){
		studentExists.firstname = firstname;
		studentExists.lastname = lastname;
		studentExists.parentEmail = parentEmail;
		studentExists.parent2Email = parent2Email;

		const updateStudent = await studentExists.save();
		res.json(updateStudent);

	} else {
		res.status(400).json({message: 'Student not found'})
	}
});

const deleteStudent = asyncHandler(async(req, res) => {
	const {id} = req.params;
	const studentExists = await Student.findOne({_id:id});

	if (studentExists){
		await studentExists.deleteOne({_id:id});
		res.json({message: "Student removed"});
	} else {
		res.status(400);
		throw new Error('Student not found');
	}
});

module.exports = { addStudent, getStudents, getStudentById, getStudentByEmail, updateStudent, deleteStudent};