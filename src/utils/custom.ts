export const difference = (A: any, B: any) => {
  const arrA = Array.isArray(A) ? A.map(x => x.toString()) : [A.toString()];
  const arrB = Array.isArray(B) ? B.map(x => x.toString()) : [B.toString()];

  const result = [];
  for (const p of arrA) {
    if (arrB.indexOf(p) === -1) {
      result.push(p);
    }
  }

  return result;
};