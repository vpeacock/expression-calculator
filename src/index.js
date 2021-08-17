function eval() {
  // Do not use eval!!!
  return;
}

const splitString = (str) => {
  let strArr = [...str]
  let result = [];
  let num = [];
  for (let char of strArr) {
    if (char !== ' ') {
      if (typeof +char === 'number' && !isNaN(+char)) {
        num.push(char)
      } else {
        if (num.length !== 0) {
          result.push(num.join(''))
          num = [];
        }
        result.push(char)
      }
    }
  }
  if (num.length !== 0) result.push(num.join(''))
  return result
}

const checkBrackets = (str) => {
  return str.split("(").length === str.split(")").length ? true : false;
}

const reversePolishNotation = (arr) => {
  let rpn = [];
  let stack = [];

  const prioritet = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  if (!checkBrackets(arr)) throw ("ExpressionError: Brackets must be paired");
  arr = splitString(arr)

  for (let elem of arr) {
    if (typeof +elem === 'number' && !isNaN(+elem)) {
      rpn.push(elem);
    } else if (elem === '(') {
      stack.push(elem)
    } else if (elem === ')') {
      while (stack[stack.length - 1] !== '(') {
        rpn.push(stack.pop())
      }
      stack.pop()
    } else {
      while (prioritet[elem] <= prioritet[stack[stack.length - 1]]) {
        rpn.push(stack.pop())
      }
      stack.push(elem)
    }
  }
  while (stack.length !== 0) {
    rpn.push(stack.pop())
  }
  return rpn
}

const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => {
    if (y !== 0) {
      return x / y
    } else throw ("TypeError: Division by zero.")
  }
};

let calc = (num, operator) => {
  let number1 = num.pop()
  let number2 = num.pop()
  return operators[operator](number2, number1);
}

const expressionCalculator = (expr) => {
  let stack = [];
  expr = reversePolishNotation(expr);

  for (let item of expr) {
    if (typeof +item === 'number' && !isNaN(+item)) {
      stack.push(+item);
    } else {
      stack.push(calc(stack, item))
    }
  }
  return stack.pop()
}


module.exports = {
  expressionCalculator
}