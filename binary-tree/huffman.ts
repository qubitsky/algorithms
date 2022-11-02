interface TreeNode<T> {
  data: T | null;
  weight: number;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

// 从树的集合构造 huffman 树，即 WPL 最小的树
// 算法：
// 1. 先按权重从大到小排列
// 2. 取出最右侧两个树，组成一个新树
// 3. 新树放回最右侧
// 4. 使用冒泡法，将新树往左移动到合适位置
// 5. 回到步骤2，直到最终剩下1棵树
function toHuffmanTree<T>(trees: TreeNode<T>[]): TreeNode<T> {
  trees = trees.sort((a, b) => {
    return b.weight - a.weight;
  });
  while (trees.length > 1) {
    const left = trees.pop() as TreeNode<T>;
    const right = trees.pop() as TreeNode<T>;
    const newTree: TreeNode<T> = {
      data: null,
      weight: left.weight + right.weight,
      left,
      right,
    };
    trees.push(newTree);
    for (let i = trees.length - 1; i; i--) {
      if (trees[i - 1].weight < trees[i].weight) {
        const tmp = trees[i];
        trees[i] = trees[i - 1];
        trees[i - 1] = tmp;
      }
    }
  }
  return trees[0];
}

function getBiTreeDepth<T>(tree: TreeNode<T>) {
  let depth = 0;
  const traverse = (t: TreeNode<T> | null, d: number) => {
    if (!t) {
      return;
    }
    d++;
    if (d > depth) {
      depth = d;
    }
    traverse(t.left, d);
    traverse(t.right, d);
  };
  traverse(tree, 0);
  return depth;
}

// 打印二叉树，结点占1个字符
function printBinaryTree<T>(
  tree: TreeNode<T>,
  node2string: (node: TreeNode<T>) => string
) {
  const depth = getBiTreeDepth(tree);
  const totalLevel = depth > 1 ? 3 * 2 ** (depth - 2) : depth;
  const getNodeLine = (c: string, l: number): string => {
    let res = "";
    while (--l) {
      res += " ";
    }
    res += c;
    return res;
  };
  const getPathLine = (l: number, g: number, { hasLeft, hasRight }) => {
    let res = "";
    while (--l) {
      res += " ";
    }
    res += hasLeft ? "/" : " ";
    if (!hasRight) return res;
    while (g--) {
      res += " ";
    }
    res += "\\";
    return res;
  };
  const getPrintLines = (t: TreeNode<T> | null, topLevel: number): string[] => {
    if (!t) return [];
    const lines: string[] = [];
    lines.push(getNodeLine(node2string(t), topLevel));
    const halfLevel = Math.floor(topLevel / 2);
    const leftLines = getPrintLines(t.left, halfLevel);
    const rightLines = getPrintLines(t.right, halfLevel);
    if (!leftLines.length && !rightLines.length) {
      return lines;
    }
    let level = topLevel - 1,
      gap = 1;
    while (level > topLevel / 2) {
      lines.push(
        getPathLine(level, gap, {
          hasLeft: !!leftLines.length,
          hasRight: !!rightLines.length,
        })
      );
      level--;
      gap += 2;
    }
    const maxLen = Math.max(leftLines.length, rightLines.length);
    for (let i = 0; i < maxLen; i++) {
      let str = leftLines[i] || "";
      if (rightLines[i]) {
        let padLen = Math.max(topLevel, 4);
        while (str.length < padLen) {
          str += " ";
        }
        str += rightLines[i] || "";
      }
      lines.push(str);
    }
    return lines;
  };
  const printLines = getPrintLines(tree, totalLevel);
  console.log(printLines.join("\n"));
}

function test() {
  const tree: TreeNode<string>[] = [];
  for (let i = 0; i < 6; i++) {
    tree.push({
      data: i + "",
      weight: Math.random(),
      left: null,
      right: null,
    });
  }
  const hTree = toHuffmanTree(tree);
  printBinaryTree(hTree, ({ data }) => data || "#");
}
