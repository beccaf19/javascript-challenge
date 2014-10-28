/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

//takes an element as an argument returns whether birthday is valid or not
function validateBirthday(birthday) {
	var birthDate = Date.parse(birthday.value.trim());
	var userBirthdate = new Date (birthDate);
	var userDate = userBirthdate.getUTCDate();
	var userMonth = userBirthdate.getUTCMonth();
	var userYear = userBirthdate.getUTCFullYear(); 

	var currDate = new Date();
	var currDay = currDate.getDate();
	var currMonth = currDate.getMonth();
	var currYear = currDate.getFullYear();

	var validBirthday = true;
	if (currYear - userYear < 13) {
		document.getElementById('birthdateMessage').innerHTML =
		'You must be 13 years old to submit this form';
		validBirthday = false;
	} else if (currYear - userYear == 13) {
		if (userMonth > currMonth) {
			document.getElementById('birthdateMessage').innerHTML =
			'You must be 13 years old to submit this form';
			validBirthday = false;
		} else if (userMonth == currMonth) {
			if (userDate > currDay) {
				document.getElementById('birthdateMessage').innerHTML =
				'You must be 13 years old to submit this form';
				validBirthday = false;
			}
		}
 	}
	return validBirthday;
}

//takes an zip code elemnet as an argument and returns whether it is valid or not
function validateZip (zip) {
	var zipRegExp = new RegExp('^\\d{5}$');
	var validZip = zipRegExp.test(zip.value.trim());
	if (validZip == false) {
		zip.className = 'form-control invalid';
		zip.style.borderWidth = '1px';
		zip.style.borderStyle = 'solid';
 		zip.style.borderColor = '#FF0000'; 
	}
	if (validZip == true) {
		zip.className = 'form-control'; 
		zip.style.border = 'initial';
	}
	return validZip;
}

//takes a field and returns whether it is valid or not
function validateField(field) {	
	var fieldValue = field.value.trim();
	var valid = fieldValue.length > 0;
	if (valid) {
		field.className = 'form-control';
		field.style.border = 'initial';
	} else {
		field.className = 'form-control invalid';
		field.style.borderWidth = '1px';
		field.style.borderStyle = 'solid';
 		field.style.borderColor = '#FF0000'; 
	}
	return valid;
}

//takes a form element and validates everything in form, including fields and special entry
function validateForm () {
	var formValid = true;
	if (document.getElementById('occupation').value == 'other') {
		var requiredFields = ['firstName', 'lastName', 'birthdate', 'address1' , 'city'
		, 'zip', 'state', 'occupationOther'];
	} else {
		var requiredFields = ['firstName', 'lastName', 'birthdate', 'address1' , 'city'
		, 'zip', 'state'];
	}
	var idx

	//make sure each field isnt empty or blank
	for (idx = 0; idx < requiredFields.length; idx++) {
		var requiredField = requiredFields[idx];	
		var field = document.getElementById(requiredField);

		//test if field is valid
		var validField = validateField(field);
		//test zip code for validity
		if (requiredField == 'zip') {
			var validZip = validateZip(field);
		}
		//test birthdate for over 13 years old
		if (requiredField == 'birthdate') {
			var validBirthday = validateBirthday(field);
		}
	}
	if (validField == false || validZip == false || validBirthday == false) {
		formValid = false;
	}
	return formValid;
}



document.addEventListener('DOMContentLoaded', function() {
	//counter variable
	var idx;
	//list of state variables - each containes id and text
	var stateList = usStates;
	//option for each states
	var stateId;

	var mailingForm = document.getElementById("signup");

	for (idx = 0; idx < stateList.length; idx++) {
		//create empty option
		stateId = document.createElement("option");
		//add value to option
		stateId.value = stateList[idx].code;
		//add display text to option
		stateId.text = stateList[idx].name;
		//append new option to state form dropdown
		document.getElementById("state").appendChild(stateId);
	}

	//displays text entry field for other occupation
	occupation.addEventListener('change', function(){
		if (document.getElementById('occupation').value === 'other') {
			document.getElementById('occupationOther').style.display =  'block'; 
		}  else if (document.getElementById('occupation').value != 'other') {
			document.getElementById('occupationOther').style.display = 'none';
		}

	});

	//confirm user no thanks
	cancelButton.addEventListener('click', function(){
		var confirm = window.confirm('Do you really want to leave?');
		if (confirm == true) {
			window.location.href =('http://google.com');
		}
	});

	//validate fields and form
	mailingForm.addEventListener('submit', function(evt){
		var valid;
		try {
			valid = validateForm();
		} catch(err) {
			valid = false;
			console.log(err);
		}
		if (false == valid) {
			evt.preventDefault();
			evt.returnValue = valid;
		}	
		return valid;
	});	

});

