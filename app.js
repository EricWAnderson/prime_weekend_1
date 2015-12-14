var array = [];
var monthlyPayroll = 0;

$(document).ready(function(){

	//take form submission, update array and DOM
	$("#employeeinfo").on('submit', employeeSubmit);

	//delete employee from array and DOM
	$("#container").on('click', '#employeeDelete', employeeDelete);

});

function employeeSubmit() {
	event.preventDefault();
	var values = {};

	//set input form information to values object
	$.each($("#employeeinfo").serializeArray(), function(i, field){
		values[field.name] = field.value;
	})

	$("#employeeinfo").find("input[type=text]").val("");
	$("#employeeinfo").find("input[type=number]").val("");

	//push values object to array
	array.push(values);
	console.log(array);

	//calculate monthly payroll
	monthlyPayroll = calcMonthlyPayroll(array);
	console.log("Monthly cost of salaries is $" + monthlyPayroll);

	//update the DOM
	appendDom(values, monthlyPayroll);
}

function employeeDelete() {
	event.preventDefault();

	//find which employee ID is being deleted
	var $id = $(this).parent().children("li").data("id");
	console.log($id);
	
	//remove the employee from the array
	for (var i = 0; i<array.length; i++) {
		if (array[i].employeeNumber == $id) {
			array.splice(i,1);
			console.log(array);
		}
	}

	//calculate the new monthly payroll
	monthlyPayroll = calcMonthlyPayroll(array);

	//remove the employee from the DOM, update monthly payroll
	$(this).parent().remove();
	$("#monthlyPayroll").text(monthlyPayroll);
}

function calcMonthlyPayroll(array){
	var sumAnnualSalaries = 0;
	var monthlyPayroll = 0;

	//sum all the annual salaries of all employees
	for (var i = 0; i<array.length; i++) {
		sumAnnualSalaries += Math.round(array[i].employeeAnnualSalary);
	}

	//calculate monthly payroll requirement
	monthlyPayroll = Math.round(sumAnnualSalaries / 12);

	return monthlyPayroll;
}

function appendDom(object, variable){
	//add employee info as unordered list, add delete button, update monthly payroll text
	$("#container").append("<ul class=\"list-inline employee\"></ul>");
	var $el = $("#container").children().last();
	var deleteButton = "<button id='employeeDelete' type='submit' value='Delete Employee' class='btn btn-mini pull-right'>Delete Employee</button>";

	$el.append("<li data-id='" + object.employeeNumber + "''>#" + object.employeeNumber + ":</li>");
	$el.append("<li>" + object.employeeFirstName + "</li>");
	$el.append("<li>" + object.employeeLastName + ",</li>");
	$el.append("<li>" + object.employeeJobTitle + "</li>");
	$el.append("<li data-id='" + object.id + "'>$" + object.employeeAnnualSalary + "</li>");
	$el.append(deleteButton);

	$("#monthlyPayroll").text(variable);
}

