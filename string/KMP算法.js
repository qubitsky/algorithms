// 计算next数组next[i]表示到str[i]的子串的最长相等前后缀长度
// next[i]的值v即str[i+1]与主串不等时，需要调整为从str[v]开始比较
function getNext(str) {
  const next = [];
  next[0] = 0;
  if (str.length < 2) {
    return next;
  }
  for (let i = 1; i < str.length; i++) {
    const c1 = str[i];
    let j = next[i - 1];
    while (j > 0) {
      const c2 = str[j];
      if (c1 === c2) {
        next[i] = j + 1;
        break;
      }
      j = next[j - 1];
    }
    if (j === 0) {
      if (str[0] === c1) {
        next[i] = 1;
      } else {
        next[i] = 0;
      }
    }
  }
  return next;
}

function kmpFind(str, subStr) {
  const next = getNext(subStr);
  let i = 0,
    j = 0;
  while (i < str.length && j < subStr.length) {
    const c1 = str[i];
    const c2 = subStr[j];
    if (c1 === c2) {
      i++;
      j++;
      continue;
    }
    if (j === 0) {
      i++;
      continue;
    }
    j = next[j - 1];
  }
  if (j < subStr.length) {
    return -1;
  } else {
    return i - subStr.length;
  }
}
