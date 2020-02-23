//********************
//*       main       *
//********************
let lastInput = '';
let DisplayBottomValue = '';

addAllEventListeners();



//********************
//*  user interface  *
//********************

function addAllEventListeners(){
	addDigitBtnEventListeners();
	addOperatorBtnEventListeners();
}

function addDigitBtnEventListeners() {
	const buttons = document.querySelectorAll('.digit')

	buttons.forEach( button => {button.addEventListener('click', event => checkInput(event.target.getAttribute('data-value')))} );
}

function addOperatorBtnEventListeners() {
	const buttons = document.querySelectorAll('.operator')

	buttons.forEach( button => {button.addEventListener('click', event => checkInput(event.target.getAttribute('data-value')))});
}

function checkInput(value) {
	if (value === '.') {
		if (!(isNaN(lastInput)) && !(DisplayBottomValue.includes('.'))) {
			lastInput = value; 
			updateDisplayBottom(value);}
	} else if (isOperator(value)) {
		if (!(isOperator(lastInput)) && !(lastInput === '.')) {
			lastInput = value; 
			updateDisplayBottom(getOperatorSymbol(value));}
	} else if (!(isNaN(value)) || lastInput === '') {
		lastInput = value;
		updateDisplayBottom(value);
	}
}

function updateDisplayBottom(value) {
	const DisplayBottom = document.getElementById('display_bottom_content');
	DisplayBottomValue = DisplayBottomValue + value;
	DisplayBottom.textContent = DisplayBottomValue;
}

function isOperator(value) {
	const operators = {
		add:'+',
		subtract:'-',
		multiply:'*',
		divide:'/',
		modulo:'%',
		power:'^',
		factorial:'!'
	}
	if (operators.hasOwnProperty(value)) return true;
	else return false;
}


function getOperatorSymbol(operator) {
	const operators = {
		add:'+',
		subtract:'-',
		multiply:'*',
		divide:'/',
		modulo:'%',
		power:'^',
		factorial:'!'
	}
	return operators[operator];
}

//********************
//* calculator logic *
//********************

function operate(x,y,operator) {
	if (!operator) {alert('Please choose a an operator!'); return false;}
	if (isNaN(x) || isNaN(y)) {alert('Please choose a valid number!'); return false;}

	let result;

	switch (operator) {
		case 'add':
			result = add(x,y);
			break;
		case 'subtract':
			result = subtract(x,y);
			break;
		case 'multiply':
			result = multiply(x,y);
			break;
		case 'divide':
			result = divide(x,y);
			break;
		case 'modulo':
			result = modulo(x,y);
			break;
		case 'power':
			result = power(x,y);
			break;
		case 'factorial':
			result = factorial(x);
			break;
		default:
			alert('This shouldn\'t happen.');
			return false;
	}

	console.log(x+' "'+operator+'" '+y+' makes: '+result);
	return result;
}

function add(x,y) {
	return x+y;
}

function subtract(x,y) {
	return x-y;
}

function multiply(x,y) {
	return x*y;
}

function divide(x,y) {
	return x*y;
}

function modulo(x,y) {
	return x%y;
}

function power(x,y) {
        let power = 1;
        for (let i = y; i > 0; i--) {
                power *= x;
        }
        return power;
}

function factorial(x) {
        let factorial = 1;
        for (let i = x; i>0; i--) {
                factorial *= i;
        }
        return factorial;
}
