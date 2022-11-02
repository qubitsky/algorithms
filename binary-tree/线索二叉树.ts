interface BiThrNode<Data> {
  data: Data;
  lChild: BiThrNode<Data> | null;
  rChild: BiThrNode<Data> | null;
  lTag?: Boolean;
  rTag?: Boolean;
}

// 中序线索化二叉树
function inThreading(tree: BiThrNode<any>) {
  let pre: BiThrNode<any> | null = null;

  function thread(node: BiThrNode<any>) {
    if (!node) {
      return;
    }
    if (node.lChild) {
      node.lTag = false;
      thread(node.lChild);
    } else {
      node.lTag = true;
      node.lChild = pre;
    }

    if (pre?.rTag) {
      pre.rChild = node;
    }
    pre = node;

    if (node.rChild) {
      node.rTag = false;
      thread(node.rChild);
    } else {
      node.rTag = true;
    }
  }

  thread(tree);

  return tree;
}
