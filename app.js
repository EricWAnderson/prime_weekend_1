var array = [];
var monthlyPayroll = 0;

$(document).ready(function(){
	$("#employeeinfo").on('submit', employeeSubmit);
	$("#container").on('click', '#employeeDelete', employeeDelete);

});

function appendDom(object, variable){
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

function employeeSubmit() {
	event.preventDefault();
	var values = {};

	$.each($("#employeeinfo").serializeArray(), function(i, field){
		values[field.name] = field.value;
	})

	$("#employeeinfo").find("input[type=text]").val("");
	$("#employeeinfo").find("input[type=number]").val("");

	array.push(values);
	console.log(array);
	monthlyPayroll = calcMonthlyPayroll(array);
	console.log("Monthly cost of salaries is $" + monthlyPayroll);

	appendDom(values, monthlyPayroll);
}

function employeeDelete() {
	event.preventDefault();

	//find which employee ID is being deleted
	var $id = $(this).parent().children("li").first().data("id");
	
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

	for (var i = 0; i<array.length; i++) {
		sumAnnualSalaries += Math.round(array[i].employeeAnnualSalary);
	}

	monthlyPayroll = Math.round(sumAnnualSalaries / 12);

	return monthlyPayroll;
}


