function funSort(input) {
  let comparisons = 0;
  let swaps = 0;

  function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
  }

  function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      comparisons++;
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
        swaps += (left.length - i); // cuenta inversiones
      }
    }

    return result
      .concat(left.slice(i))
      .concat(right.slice(j));
  }

  const sorted = mergeSort([...input]);

  return { sorted, comparisons, swaps };
}

function countInversions(arr) {
  let inv = 0;
  for (let i = 0; i < arr.length; i++)
    for (let j = i+1; j < arr.length; j++)
      if (arr[i] > arr[j]) inv++;
  return inv;
}

const tests = [
  [3, 1, 4, 1, 5, 9, 2, 6],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [8, 7, 6, 5, 4, 3, 2, 1],
];

for (const arr of tests) {
  const F = countInversions(arr);
  const result = funSort(arr);
  const n = arr.length;
  const bound = (n + F) * Math.log2(n);
  console.log(`Input: [${arr}]`);
  console.log(`  F=${F}, comparaciones=${result.comparisons}, swaps=${result.swaps}, O((n+F)logn)=${bound.toFixed(0)}`);
  console.log(`  Ordenado: [${result.sorted}]`);
  console.log('');
}

const n = 8;
let totalF = 0;
for (let t = 0; t < 10000; t++) {
  const arr = Array.from({length:n},(_,i)=>i+1);
  for (let i=n-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  totalF += countInversions(arr);
}
console.log(`E[F] simulado (n=${n}): ${(totalF/10000).toFixed(2)}`);
console.log(`E[F] teórico n(n-1)/4: ${n*(n-1)/4}`);
console.log(`Umbral Teorema 6 (F = o(n²/logn)): ${(n*n/Math.log2(n)).toFixed(0)}`);