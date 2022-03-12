var operators = { //map of operators that, when it sees the string version of them it will run the function
    '+': function(a, b) { return a + b },
    '-': function(a, b) { return a - b },
    '*': function(a, b) { return a * b },
    '/': function(a, b) { if (b === 0) {
        return 'ERROR'
    } else {
        return a / b 
    }
    }
};

arrDisplay = [];
const clear = document.querySelector("div[data-action='clear']");
const dis = document.querySelector('#display');

const button = document.querySelectorAll('.button');
button.forEach(bt => bt.addEventListener('click', e => {
    if (e.target.matches('div')) {
        const key = e.target; // finds each button's id
        const action = key.dataset.action; // finds the data-action of each button
        key.classList.add('clicked');
        clear.innerText =  'CE';
        bt.addEventListener('transitionend', removeTransition)
        if (!action) { // if no action, it is a number key
            console.log('number key');
            arrDisplay.push(bt.innerText);
        } else if (action === 'decimal') {
            arrDisplay.push(bt.innerText);
            console.log('decimal');
        } else if (action === 'clear') {
            if (clear.innerText == 'CE') {
                arrDisplay.pop();
            } else {
                arrDisplay = [];
                console.log('clear key');
            }  
        } else if (action === 'equals') {
            clear.innerText = 'AC';
            display = arrDisplay.join('');
            let numbers = display.replace(/([-+*\/])/g, ' ').split(' ');
            console.log(numbers);
            let arrExpression = [];
            for (let i = 0; i < arrDisplay.length; i++) {
                if (display[i] != '+' || display[i] != '-' || arrDisplay[i] != '*' || arrDisplay[i] != '/') {
                    arrExpression.push(arrDisplay[i]);
                }
            }
            console.log(bt.innerText);
            console.log(display);
            total = 0;
            for (let j = 0; j < numbers.length; j++) {
                operator1:
                for (let i = 0; i < arrDisplay.length; i++) {
                    if (arrDisplay[i] == '+' || arrDisplay[i] == '-' || arrDisplay[i] == '*' || arrDisplay[i] == '/') {
                        total = operators[arrdDisplay[i]](parseFloat(numbers[j]), parseFloat(numbers[j+1]));
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
            if (total != 0) {
                arrDisplay.push(total);  
            }
        } else {
            console.log('operator key');
            arrDisplay.push(bt.innerText);
        }
        display = arrDisplay.join('');
        dis.innerText = display;
        if (display === '') {
            dis.innerText = '0';
        }
        console.log(dis.innerText);
    }
}));

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // skip if its not a transform
    this.classList.remove('clicked');
  }
