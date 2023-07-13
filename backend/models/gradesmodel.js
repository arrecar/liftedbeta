const mongoose = require('mongoose');

const gradesSchema = mongoose.Schema(
	{
		_id: {
			type: Number,
			required: true,
			unique: true,
		},
		unit: {
			type: Number,
			required: true,
		},
		grade: {
			type: Number,
			required: true,
		},
		student: {
			type: Number,
			required: true,
		},
		teacher: {
			type: String,
			required: true,
		},
		comments:{
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Grades = mongoose.model('Grades',gradesSchema);

module.exports = Grades;