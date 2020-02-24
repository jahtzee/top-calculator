//********************
//*       main       *
//********************
const operators = {
	add: {
		sign: '+',
		precedence: 1
	},
	subtract: {
		sign: '-',
		precedence: 1
	},
	multiply: {
		sign: '*',
		precedence: 2
	},
	divide: {
		sign: '/',
		precedence: 2
	},
	modulo: {
		sign: '%',
		precedence: 2
	},
	power: {
		sign: '^',
		precedence: 3
	},
	factorial: {
		sign: '!',
		precedence: 4
	}
}
let lastSeperator = '';
let mathExpression = [];

addAllEventListeners();

//********************
//*  user interface  *
//********************

function addAllEventListeners(){
	addDigitBtnEventListeners();
	addOperatorBtnEventListeners();
	addFuncEventListeners();
}

function addDigitBtnEventListeners() {
	const buttons = document.querySelectorAll('.digit')

	buttons.forEach( button => {button.addEventListener('click', event => checkInput(event.target.getAttribute('data-value')))} );
}

function addOperatorBtnEventListeners() {
	const buttons = document.querySelectorAll('.operator')

	buttons.forEach( button => {button.addEventListener('click', event => checkInput(event.target.getAttribute('data-value')))});
}

function addFuncEventListeners() {
	const sign = document.querySelector('.sign');
	const clear = document.querySelector('.clear');
	const equals = document.querySelector('.equals');

	sign.addEventListener('click', event => checkInput(event.target.getAttribute('data-value')));
	clear.addEventListener('click', () => clearBtnFunc());
	equals.addEventListener('click', () => evaluateExpression());
}

function checkInput(value) {
	if (value === '.') {
		if (!(lastSeperator === '.') && !(isNaN(mathExpression[mathExpression.length-1]))) {
			lastSeperator = value; 
			updateDisplayBottom(value);
		}
	} else if (isOperator(value)) {
		if (!(isNaN(mathExpression[mathExpression.length-1]))) {
			lastSeperator = value; 
			updateDisplayBottom(value);
		}
	} else if (value === 'neg') {
		if (mathExpression[mathExpression.length-1] === 'neg' && isOperator(lastSeperator)) {
			mathExpression.pop();
		} else if (isNaN(mathExpression[mathExpression.length-1])) {
			lastSeperator = value;
			updateDisplayBottom(value);
		}
	} else if (true) {
		updateDisplayBottom(value);
	}
}

function updateDisplayBottom(value) {
	const DisplayBottom = document.getElementById('display_bottom_content');
	mathExpression.push(value);
	DisplayBottom.textContent = cleanupForDisplay(mathExpression);
}

function cleanupForDisplay(array) {
	let result = mathExpression.toString().replace(/\,/g, '').replace(/neg/g, '-');
	for (operator in operators) {
		regex = new RegExp(operator, 'g');
		result = result.replace(regex, operators[operator]['sign']);
	}
	return result;
}

function isOperator(value) {
	if (operators.hasOwnProperty(value)) return true;
	else return false;
}

function isOperand(value) {
	if (!(isNaN(value))) return true;
	else return false;
}

function getOperatorSymbol(operator) {
	return operators[operator]['sign'];
}

function clearBtnFunc() {
	const DisplayBottom = document.getElementById('display_bottom_content');
	lastSeperator = '';
	mathExpression = [];
	DisplayBottom.textContent = '';
}

function evaluateExpression() {
	const preppedExpression = prepExpression(stripTrailingOperator(mathExpression));
	const postfixExpression = infixToPostfix(preppedExpression);

	console.table(preppedExpression);
}

function stripTrailingOperator(array) {
	if (isOperator(array[array.length-1])) array.pop();
	return array;
}


//*******************
//*    conversion   *
//*******************
function prepExpression(array) {
	let result = [];
	array.reduce( (preppedPart, element, index) => {
		if (!(isOperator(element))) {
			if (index == array.length-1) {
				result.push(preppedPart+=element);
			}
			return preppedPart += element;
		} else {
			result.push(preppedPart);
			result.push(element);
			return '';
		}
	});
	return result;
}

function infixToPostfix(array) {
	let stack = [];
	let result = [];

	array.forEach( element => {
		if (isOperand(element)) {
			result.push(element);
		} else if (isOperator(element)) {
			while ( stack[0] && (operators[stack[stack.length-1]]['precedence'] >= operators[element]['precedence']) ) {
				result.push(stack.pop());
			}
			stack.push(element);
		}
	} )

	while (stack[0]) {
		result.push(stack.pop());
	}

	console.table(result);
	return result;
}

//********************
//* calculator logic *
//********************

function operate(x,y,operator) {
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
