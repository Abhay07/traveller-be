const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
let TravellerSchema = new Schema({
	name:{
		type:String,
		required:true, 
		match:[/^[\w]{3,}[\w\s]*$/,'Invalid name, minimum 3 character required']
	},
	email:{
		type:String, 
		required:true,
		match:[/^[^@\s]+@[^@\s]+\.[^@\s]+$/,'Invalid email']
	},
	dob:{
		type:Date, 
		required:true,
	},
	phone:{
		type:String,
		required:true,
		match:[/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,'Invalid phone number']
	},
	_id:{
		type:String,
		default:shortid.generate
	}
});

module.exports = mongoose.model('Traveller', TravellerSchema);