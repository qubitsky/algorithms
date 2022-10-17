// 根据扩展二叉树遍历序列还原二叉树
// 先序和后序序列可以还原，中序不可

// 递归法-前序
function recursePreOrderToBinaryTree(orderStr) {
  const arr = orderStr.split("");
  let i = 0;
  const recurse2tree = () => {
    const item = arr[i++];
    if (item === "#") {
      return null;
    }
    return {
      value: item,
      left: recurse2tree(),
      right: recurse2tree(),
    };
  };
  return recurse2tree();
}

// 迭代法-前序
function iteratePreOrderToBinaryTree(orderStr) {
  const arr = orderStr.split("");
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    stack.push(value === "#" ? null : { value });
    let top = stack[stack.length - 1];
    while ((!top || "right" in top) && stack.length > 1) {
      const node = stack.pop();
      top = stack[stack.length - 1];
      if (!("left" in top)) {
        top.left = node;
      } else if (!("right" in top)) {
        top.right = node;
      }
    }
  }
  return stack[0];
}

// 递归法-后序
function recursePostOrderToBinaryTree(orderStr) {
  // 前序问题的镜像
}
