var operators = { //map of operators that, when it sees the string version of them it will run the function
    '+': function(a, b) { return a + b },
    '-': function(a, b) { return a - b },
    '*': function(a, b) { return a * b },
    '/': function(a, b) { return a / b }
};

startDisplay = 0;
arrDisplay = [];

const dis = document.querySelector('#display');

const button = document.querySelectorAll('.button');
button.forEach(bt => bt.addEventListener('click', e => {
    if (e.target.matches('div')) {
        const key = e.target; // finds each button's id
        const action = key.dataset.action; // finds the data-action of each button
        key.classList.add('clicked');
        bt.addEventListener('transitionend', removeTransition)
        if (!action) { // if no action, it is a number key
            console.log('number key');
            arrDisplay.push(bt.innerText);
        } else if (action === 'decimal') {
            arrDisplay.push(bt.innerText);
            console.log('decimal');
        } else if (action === 'clear'){
            arrDisplay = [];
            console.log('clear key');
            return dis.innerText = startDisplay;
        } else if (action === 'equals') {
            display = arrDisplay.join('');
            let numbers = display.replace(/([-+*\/])/g, ' ').split(' ');
            console.log(numbers);
            let arrExpression = [];
            for (let i = 0; i < arrDisplay.length; i++) {
                if (display[i] != '+' || display[i] != '-' || display[i] != '*' || display[i] != '/') {
                    arrExpression.push(display[i]);
                }
            }
            console.log(bt.innerText);
            console.log(display);
            total = 0;
            for (let j = 0; j < numbers.length; j++) {
                operator1:
                for (let i = 0; i < arrDisplay.length; i++) {
                    if (display[i] == '+' || display[i] == '-' || display[i] == '*' || display[i] == '/') {
                        total = operators[display[i]](parseFloat(numbers[j]), parseFloat(numbers[j+1]));
                        numbers.shift();
                        numbers.shift();
                        numbers.unshift(total);
                        console.log(numbers);
                    } else {
                        continue operator1;
                    }
                    console.log(j);
                }
            }
            console.log(total);
            display = total
            arrDisplay = [];
            arrDisplay.push(total);
            return dis.innerText = display;  
        } else {
            console.log('operator key');
            arrDisplay.push(bt.innerText);
        }
        display = arrDisplay.join('');
        dis.innerText = display;
    }
}));

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // skip if its not a transform
    this.classList.remove('clicked');
  }
