
// PROBLEMA 6c: Iteraciones de bogo-sort ~ Geom(1/n!)

function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

// Retorna true si arr está en orden no-decreciente
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

// Fisher-Yates shuffle in-place. Retorna número de swaps realizados (n-1).
function shuffle(arr) {
  let swaps = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    swaps++;
  }
  return swaps;
}

// Corre bogo-sort sobre permutación aleatoria de [1..n].
// Retorna { iterations, swaps, timedOut }
function bogoSortIterations(n, maxIter = 100000) {
  const arr = Array.from({ length: n }, (_, i) => i + 1);


  let iterations = 1;
  let swaps = shuffle(arr);

  while (!isSorted(arr)) {
    if (iterations > maxIter) return { iterations, swaps, timedOut: true };
    swaps += shuffle(arr);
    iterations++;
  }

  return { iterations, swaps, timedOut: false };
}

// ── Simulación ────────────────────────────────────────
const TRIALS = 5000;

function runSimulation(n) {
  let totalIter = 0, totalSwaps = 0, timedOut = 0;

  for (let t = 0; t < TRIALS; t++) {
    const r = bogoSortIterations(n);
    if (r.timedOut) {
      timedOut++;
    } else {
      totalIter += r.iterations;
      totalSwaps += r.swaps;
    }
  }

  const valid = TRIALS - timedOut;
  return {
    n,
    nfact: factorial(n),
    simIter:  (totalIter  / valid).toFixed(2),
    teorIter: factorial(n),
    simSwaps: (totalSwaps / valid).toFixed(2),
    teorSwaps: (n - 1) * factorial(n),
    timedOut,
  };
}

// ── Resultados para n = 4 (verificación principal) ───

console.log('Verificación principal: n = 4 (n! = 24)');


const r4 = runSimulation(4);
console.log(`E[iteraciones] simulado : ${r4.simIter}`);
console.log(`E[iteraciones] teórico  : ${r4.teorIter} `);
console.log(`E[swaps] simulado       : ${r4.simSwaps}`);
console.log(`E[swaps] teórico        : ${r4.teorSwaps} `);

// ── Tabla comparativa para varios n ──────────────────
console.log('Cómo crecen los valores con n');
console.log('n  | n!   | E[iter] sim | E[iter] teo | E[swaps] sim | E[swaps] teo');
console.log('---|------|-------------|-------------|--------------|-------------');

for (const n of [3, 4, 5]) {
  const r = runSimulation(n);
  console.log(
    `${r.n}  | ${String(r.nfact).padEnd(4)} | ${String(r.simIter).padEnd(11)} | ${String(r.teorIter).padEnd(11)} | ${String(r.simSwaps).padEnd(12)} | ${r.teorSwaps}`
  );
}

console.log('\n→ E[iteraciones] ≈ n! y E[swaps] ≈ (n-1)·n!, firma de Geom(1/n!).');