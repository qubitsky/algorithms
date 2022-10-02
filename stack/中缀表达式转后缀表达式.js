// 中缀表达式转后缀表达式
// 遍历表达式
// 碰到数字直接输出
// 碰到运算符
// 如果是左括号，则入栈
// 如果是右括号，则输出栈顶运算符知道碰到左括号
// 如果，是高优先级运算符，则输出运算符
// 否则，输出栈顶运算符，然后压入当前运算符

function infixExpression2suffixExpression(infixArr) {
  const stack = [],
    suffixArr = [];
  for (let i = 0; i < infixArr.length; i++) {
    const c = infixArr[i];
    switch (c) {
      case "(":
        stack.push(c);
        break;
      case ")": {
        let top = stack.pop();
        while (top && top !== "(") {
          suffixArr.push(top);
          top = stack.pop();
        }
        break;
      }
      case "+":
      case "-": {
        const top = stack.pop();
        if (top && top !== '(') {
          suffixArr.push(top);
        }
        stack.push(c);
        break;
      }
      case "*":
      case "/":
        stack.push(c);
        break;
      default:
        suffixArr.push(c);
        const top = stack.pop();
        if (["*", "/"].includes(top)) {
          suffixArr.push(top)
        } else if (top) {
          stack.push(top)
        }
    }
  }
  if (stack.length) {
    suffixArr.push(stack.pop());
  }
  return suffixArr;
}
