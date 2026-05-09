# Teorema 2 — Comparaciones esperadas en Bogo-Sort


## Problema 6a — Explicación de la fórmula P[Iₖ]

### Definición del evento

Sea $C$ el número de comparaciones realizadas para detectar que el arreglo **no** está ordenado. Definimos:

$$I_k = \text{"se necesitan al menos } k \text{ comparaciones"} = \text{"las primeras } k-1 \text{ comparaciones no detectaron ningún problema"}$$

### Derivación de P[Iₖ] (Razonamiento Combinatorio)

En bogo-sort, el algoritmo verifica el arreglo secuencialmente: $(A[1] \leq A[2])$, luego $(A[2] \leq A[3])$, etc.

Para que ocurra el evento $I_k$ (necesitar al menos $k$ comparaciones), las primeras $k-1$ comparaciones deben ser exitosas. Esto significa que los primeros $k$ elementos del arreglo deben estar perfectamente ordenados de forma ascendente:

$$A[1] \leq A[2] \leq \dots \leq A[k]$$

Si se asume que el arreglo es una **permutación uniformemente aleatoria**, cualquier subconjunto de $k$ elementos puede presentarse en cualquiera de sus $k!$ permutaciones posibles con la misma probabilidad. De todas estas $k!$ formas de ordenar esos $k$ elementos, solo existe exactamente **1** que los tiene en orden creciente.

Por lo tanto:

$$\boxed{P[I_k] = \frac{1}{k!}}$$



## Problema 6b — ¿Por qué E[C] = Σₖ₍>₀₎ P[Iₖ]?

### Identidad del valor esperado (Tail Sum Formula)

Para cualquier **variable aleatoria entera no negativa** $X$, se cumple la identidad:

$$E[X] = \sum_{k=1}^{\infty} P(X \geq k)$$

### Demostración de la identidad

Se parte de la definición de valor esperado:

$$E[X] = \sum_{j=0}^{\infty} j \cdot P(X = j)$$

Se reescribe $j = \sum_{k=1}^{j} 1$ (cada entero $j$ es una suma de $j$ unos):

$$E[X] = \sum_{j=0}^{\infty} \left(\sum_{k=1}^{j} 1\right) P(X = j) = \sum_{j=0}^{\infty} \sum_{k=1}^{j} P(X = j)$$

Se intercambia el orden de las sumas (válido por términos no negativos — Fubini discreto):

$$E[X] = \sum_{k=1}^{\infty} \sum_{j=k}^{\infty} P(X = j) = \sum_{k=1}^{\infty} P(X \geq k)$$

### Aplicación a E[C]

Como $C \geq k \iff I_k$ (necesitar al menos $k$ comparaciones es exactamente el evento $I_k$), se tiene:

$$P(C \geq k) = P[I_k] = \frac{1}{k!}$$

Por lo tanto, sustituyendo en la identidad:

$$E[C] = \sum_{k=1}^{n-1} P[I_k] = \sum_{k=1}^{n-1} \frac{1}{k!}$$

### Resultado y convergencia

Cuando $n \to \infty$, la suma converge a la serie conocida de $e$:

$$E[C] = \sum_{k=1}^{\infty} \frac{1}{k!} = e - 1 \approx 1.718282$$


# Problema 6c 

## Resultados obtenidos (awful_sorting6c.js)

| n | n! | E[iter] simulado | E[iter] teórico | E[swaps] simulado | E[swaps] teórico |
|---|----|-----------------|-----------------|-------------------|------------------|
| 3 | 6  | 5.87            | 6               | 11.74             | 12               |
| 4 | 24 | 23.72           | 24              | 71.15             | 72               |
| 5 | 120| 120.26          | 120             | 481.06            | 480              |



## ¿Qué significan estos resultados?

**1.** Cada shuffle produce una permutación uniforme aleatoria, y el evento "salió ordenado" tiene probabilidad $\frac{1}{n!}$ en cada intento, independientemente de los anteriores. Eso es exactamente la definición de distribución geométrica, y los datos lo confirman: `E[iteraciones] ≈ n!`.

**2.** Pasar de $n=3$ a $n=5$ sube el número esperado de iteraciones de 6 a 120. Agregar solo 2 elementos multiplica el trabajo por 20. Esto ilustra por qué bogo-sort es un algoritmo inviable en la práctica — para $n=10$ se esperarían $10! = 3{,}628{,}800$ iteraciones.

**3.** Cada shuffle hace exactamente $n-1$ swaps (Fisher-Yates), y en promedio se hacen $n!$ shuffles, entonces el total es $(n-1) \cdot n!$. Los datos también confirman esto.


