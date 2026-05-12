// ═══════════════════════════════════════════════════════
// PROBLEMA 5: Inversiones esperadas
// ═══════════════════════════════════════════════════════
//
// Una inversión es un par (i, j) donde:
// i < j pero A[i] > A[j]
//
// Valor esperado teórico:
// E[inversiones] = n(n - 1) / 4

// Cuenta cuántas inversiones tiene un arreglo
function countInversions(arr) {
  let inversiones = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        inversiones++;
      }
    }
  }

  return inversiones;
}

// Calcula el número esperado de inversiones usando la fórmula teórica
function expectedInversions(n) {
  return (n * (n - 1)) / 4;
}

// Genera una permutación aleatoria de los números 1 hasta n
function generarPermutacion(n) {
  const arr = [];

  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }

  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}

// Ejecuta una simulación para comparar el valor simulado con el teórico
function verifyExperimentally(n, trials) {
  let totalInversiones = 0;

  for (let t = 0; t < trials; t++) {
    const permutacion = generarPermutacion(n);
    totalInversiones += countInversions(permutacion);
  }

  return totalInversiones / trials;
}

// Ejecuta las pruebas para varios valores de n
function ejecutarPruebas() {
  const trials = 10000;
  const valoresN = [3, 4, 5, 6, 8, 10];

  console.log("Verificando E[inversiones] = n(n−1)/4:\n");
  console.log("n | Teórico | Simulado | Diferencia");
  console.log("--|---------|----------|-----------");

  for (const n of valoresN) {
    const teorico = expectedInversions(n);
    const simulado = verifyExperimentally(n, trials);
    const diferencia = Math.abs(teorico - simulado);

    console.log(
      `${n} | ${teorico.toFixed(3)} | ${simulado.toFixed(3)} | ${diferencia.toFixed(3)}`
    );
  }
}

// Prueba extra: arreglo invertido
function probarMaximoInversiones() {
  console.log("\nMáximo de inversiones:");

  for (const n of [4, 5, 6]) {
    const arr = [];

    for (let i = n; i >= 1; i--) {
      arr.push(i);
    }

    const inversiones = countInversions(arr);
    const maximo = (n * (n - 1)) / 2;

    console.log(
      `n=${n}: [${arr.join(", ")}] → ${inversiones} inversiones, máximo teórico = ${maximo}`
    );
  }
}

// Ejecutar programa
ejecutarPruebas();
probarMaximoInversiones();