// 前序遍历
function preOrderTraverse(t) {
  if (t === null) {
    return;
  }
  console.log(t.data);
  preOrderTraverse(t.left);
  preOrderTraverse(t.right);
}

// 中序遍历
function inOrderTraverse(t) {
  if (t === null) {
    return;
  }
  inOrderTraverse(t.left);
  console.log(t.data);
  inOrderTraverse(t.right);
}

// 后序遍历
function postOrderTraverse(t) {
  if (t === null) {
    return;
  }
  postOrderTraverse(t.left);
  postOrderTraverse(t.right);
  console.log(t.data);
}

// 层序遍历
function levelOrderTraverse(t) {
  if (t === null) {
    return;
  }
  const arr = [];
  arr.push(t);
  let i = 0;
  while (i < arr.length) {
    const item = arr[i];
    console.log(item.data);
    if (item.left) {
      arr.push(item.left);
    }
    if (item.right) {
      arr.push(item.right);
    }
    i++;
  }
}
