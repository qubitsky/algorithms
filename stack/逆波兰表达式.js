function evalReversePolishNotation(rpnArr) {
  const stack = [];
  for (let i = 0; i < rpnArr.length; i++) {
    const item = rpnArr[i];
    const num = parseInt(item);
    if (!isNaN(num)) {
      stack.push(num);
      continue;
    }
    const b = stack.pop();
    const a = stack.pop();
    switch (item) {
      case "+":
        stack.push(a + b);
        break;
      case "-":
        stack.push(a - b);
        break;
      case "*":
        stack.push(a * b);
        break;
      case "/":
        stack.push((a - (a % b)) / b);
        break;
    }
  }
  return stack.pop();
}
