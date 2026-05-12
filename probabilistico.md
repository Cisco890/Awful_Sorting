# 1. Implementa la función random(a, b) usando únicamente random01(). Ejecuta el código y verifica que: (1) la distribución de salida es uniforme (cada valor aparece ~N/(b-a+1) veces), y (2) el número promedio de intentos coincide con el valor teórico E[intentos] = 2ᵏ/(b-a+1). 

### Output código:
random(1, 6) — 10000 llamadas:
  1: █████ 17.2%
  2: █████ 15.7%
  3: █████ 16.8%
  4: █████ 16.6%
  5: █████ 17.0%
  6: █████ 16.7%

Análisis:
  k = ⌈log₂(6)⌉ = 3 bits
  P(éxito por intento) = 6/2^3 = 0.7500
  E[intentos] = 1/p = 1.3333
  → T(n) ∈ O(1) en tiempo esperado (constante, no depende de n)


Para generar números uniformes en [a,b] necesitamos k bits donde 2^k ≥ b-a+1. 
Por lo tanto, k ≥ log₂(b-a+1). Como k debe ser entero, k = ⌈log₂(b-a+1)⌉.
Con k bits generamos r ∈ [0, 2^k - 1].

Si r ∈ [0, b-a] retornamos a+r
Así pues, si 2^k > b-a+1, sobran números y no podríamos usarlos porque no serían uniformes.

Cada número tiene probabilidad 1/2^k de ser generado. Y como solo aceptamos valores en [a, b], p=P(valor final)=b−a+11​. Por lo que el número esperado de intentos es E[intentos] = 1/p = 2ᵏ/(b−a+1), coincidiendo con el valor teórico.

Así pues, la distribución si es uniforme. 

# 2. Implementa unbiasedRandom(p). Verifica que: (1) la salida es 50/50 sin importar el valor de p, y (2) el promedio de llamadas a biasedRandom coincide con E[llamadas] = 1/(p(1−p)). ¿Qué pasa cuando p está cerca de 0 o de 1?

### Output código:
p=0.1: salida=50.0% unos | E[calls] simulado=10.89 | teórico=1/(p(1-p))=11.11
p=0.3: salida=50.6% unos | E[calls] simulado=4.74 | teórico=1/(p(1-p))=4.76
p=0.5: salida=51.7% unos | E[calls] simulado=4.07 | teórico=1/(p(1-p))=4.00
p=0.7: salida=50.2% unos | E[calls] simulado=4.74 | teórico=1/(p(1-p))=4.76
p=0.9: salida=51.5% unos | E[calls] simulado=11.07 | teórico=1/(p(1-p))=11.11

¿La salida siempre es ~50%? ¿Las llamadas crecen cuando p→0 o p→1?
- La salida siempre es ~50%. Cuando p está cerca de 0 o de 1, las llamadas crecen.

La salida del algoritmo es aproximadamente 50/50 para todos los valores de p, lo cual confirma que el generador sin sesgo funciona correctamente. Esto se debe a que los pares (1,0) y (0,1) tienen la misma probabilidad p(1-p), garantizando una distribución uniforme.

Por otro lado, el número de llamadas a biasedRandom aumenta cuando p se acerca a 0 o a 1. Esto ocurre porque la probabilidad de obtener pares válidos disminuye, generando más descartes. Esto coincide con la fórmula teórica E[calls]=1/(p(1−p)), la cual crece cuando p se acerca a los extremos.

# Problema 3: Hiring Problem — Probabilidades y Esperanza

## Enunciado

Implementa `hiringAlgorithm(candidates)`. Luego ejecuta la simulación de 100,000 ensayos y confirma que:

1. `E[contrataciones] ≈ ln(n)`
2. La frecuencia del best-case, es decir, 1 contratación, se aproxima a `1/n`.
3. La frecuencia del worst-case, es decir, n contrataciones, se aproxima a `1/n!`.

## Output código

```txt
Candidatos (en orden de llegada): 3, 7, 2, 9, 1, 8, 5, 4
Contrataciones: 3 — índices: 0, 1, 3
Calificaciones contratadas: 3, 7, 9

Simulación (n=8, 100000 ensayos):
E[contrataciones] simulado: 2.7168
Hₙ (valor teórico): 2.7179
ln(n) ≈ 2.0794

P(best-case = 1 hire) simulado: 0.1254
P(best-case) teórico = 1/n: 0.1250

P(worst-case = n hires) simulado: 0.000030
P(worst-case) teórico = 1/n!: 0.000025
```

## Análisis

Para el problema de contratación, el primer candidato siempre se contrata porque no hay ningún candidato anterior con quien compararlo. Luego, cada candidato `i` se contrata solamente si es mejor que todos los candidatos anteriores.

Sea `Xᵢ = 1` si el candidato `i` es contratado. Entonces:

```txt
P(Xᵢ = 1) = P(i es el mejor entre los primeros i) = 1/i
```

Por linealidad de la esperanza:

```txt
E[X] = Σᵢ₌₁ⁿ E[Xᵢ] = Σᵢ₌₁ⁿ 1/i = Hₙ
```

Para `n = 8`:

```txt
H₈ = 1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6 + 1/7 + 1/8 = 2.7179
```

Esto coincide con la simulación, donde el promedio de contrataciones fue aproximadamente `2.7168`. Además, `Hₙ` se aproxima a `ln(n)`, por lo que el número esperado de contrataciones crece de forma logarítmica.

## Best-case

El best-case ocurre cuando solo se contrata una vez. Para que esto pase, el primer candidato debe ser el mejor de todos los `n` candidatos.

Como todas las posiciones son igualmente probables en una permutación aleatoria, la probabilidad de que el mejor candidato esté en la primera posición es:

```txt
P(best-case) = 1/n
```

Para `n = 8`:

```txt
P(best-case) = 1/8 = 0.1250
```

La simulación dio aproximadamente `0.1254`, por lo que coincide con el valor teórico.

## Worst-case

El worst-case ocurre cuando se contratan los `n` candidatos. Esto pasa únicamente cuando los candidatos llegan en orden creciente de calidad, es decir, cada nuevo candidato es mejor que todos los anteriores.

De todas las `n!` permutaciones posibles, solo una produce este caso. Por lo tanto:

```txt
P(worst-case) = 1/n!
```

Para `n = 8`:

```txt
P(worst-case) = 1/8! = 1/40320 ≈ 0.000025
```

La simulación dio aproximadamente `0.000030`, lo cual es cercano al valor teórico. Como esta probabilidad es muy pequeña, es normal que en una simulación de `100,000` ensayos el resultado pueda variar un poco.

## Conclusión

Así pues, el algoritmo sí cumple con lo esperado: el número promedio de contrataciones se aproxima a `Hₙ`, el best-case ocurre con probabilidad `1/n` y el worst-case ocurre con probabilidad `1/n!`.

# Problema 4: Suma esperada de n dados

## Enunciado

Implementa `expectedSum(n)` usando la fórmula con variables indicadoras o linealidad de la esperanza. Luego ejecuta la simulación y verifica que el promedio empírico se acerca a `3.5·n`.

También se debe explicar por qué la linealidad de la esperanza es tan poderosa en este problema.

## Output código

```txt
Verificando E[suma] = 3.5·n:

n=  1: teórico=   3.5, simulado=   3.498
n=  2: teórico=   7.0, simulado=   7.011
n=  5: teórico=  17.5, simulado=  17.486
n= 10: teórico=  35.0, simulado=  34.976
n= 20: teórico=  70.0, simulado=  69.982
n=100: teórico= 350.0, simulado= 349.892

Poder de la linealidad:
E[X₁ + X₂] = E[X₁] + E[X₂] = 3.5 + 3.5 = 7
Esto funciona SIN importar si los dados son independientes o no.
La linealidad siempre vale — solo necesitamos E[cada Xᵢ].
```

## Análisis

Sea `X` la suma total obtenida al lanzar `n` dados. Entonces podemos escribir la suma como:

```txt
X = X₁ + X₂ + ... + Xₙ
```

donde `Xᵢ` representa el valor obtenido en el dado `i`.

Como cada dado puede tomar los valores `{1, 2, 3, 4, 5, 6}` con la misma probabilidad `1/6`, la esperanza de un solo dado es:

```txt
E[Xᵢ] = (1 + 2 + 3 + 4 + 5 + 6) / 6
```

```txt
E[Xᵢ] = 21 / 6 = 3.5
```

Entonces, usando linealidad de la esperanza:

```txt
E[X] = E[X₁ + X₂ + ... + Xₙ]
```

```txt
E[X] = E[X₁] + E[X₂] + ... + E[Xₙ]
```

Como todos los dados tienen la misma esperanza:

```txt
E[X] = n · 3.5
```

Por lo tanto:

```txt
E[suma] = 3.5n
```

## Verificación con la simulación

En la simulación se lanzaron `n` dados muchas veces y se calculó el promedio empírico de las sumas. Los resultados obtenidos se acercan bastante al valor teórico `3.5n`.

Por ejemplo, para `n = 5`:

```txt
E[suma] = 3.5(5) = 17.5
```

El valor simulado fue aproximadamente `17.486`, que está muy cerca del valor esperado.

Para `n = 100`:

```txt
E[suma] = 3.5(100) = 350
```

El valor simulado fue aproximadamente `349.892`, que también se acerca mucho al valor teórico.

Esto confirma que la fórmula funciona correctamente y que, al aumentar el número de ensayos, el promedio empírico tiende a acercarse al valor esperado.

## Usando variables indicadoras

También se puede analizar el problema usando variables aleatorias indicadoras.

Sea `Yᵢⱼ = 1` si el dado `i` muestra la cara `j`, y `Yᵢⱼ = 0` en caso contrario.

Entonces:

```txt
E[Yᵢⱼ] = P(Yᵢⱼ = 1) = 1/6
```

El valor del dado `i` puede escribirse como:

```txt
Xᵢ = Σⱼ₌₁⁶ j · Yᵢⱼ
```

Por lo tanto:

```txt
E[Xᵢ] = Σⱼ₌₁⁶ j · E[Yᵢⱼ]
```

```txt
E[Xᵢ] = Σⱼ₌₁⁶ j · (1/6)
```

```txt
E[Xᵢ] = (1 + 2 + 3 + 4 + 5 + 6) / 6 = 3.5
```

Así pues, para `n` dados:

```txt
E[X] = 3.5n
```

## ¿Por qué la linealidad de la esperanza es tan poderosa aquí?

La linealidad de la esperanza es poderosa porque permite calcular la esperanza de una suma sin tener que analizar todas las combinaciones posibles de resultados de los dados.

Por ejemplo, si se lanzan `n` dados, existen `6ⁿ` combinaciones posibles. Analizar cada una sería muy complicado cuando `n` es grande.

Sin embargo, usando linealidad, solo necesitamos calcular la esperanza de un dado y multiplicarla por `n`.

Además, la linealidad de la esperanza funciona incluso si las variables aleatorias no son independientes. Esto significa que no necesitamos conocer toda la distribución conjunta de los dados para calcular la esperanza de la suma.

## Conclusión

Así pues, la suma esperada al lanzar `n` dados es:

```txt
E[suma] = 3.5n
```

La simulación confirma que el promedio empírico se acerca al valor teórico. Además, este problema muestra la utilidad de la linealidad de la esperanza, ya que permite resolver el cálculo de forma sencilla sin analizar todas las combinaciones posibles de resultados.

# Problema 5: Inversiones esperadas

## Enunciado

Implementa `countInversions(arr)` y `expectedInversions(n)`. Luego ejecuta `verifyExperimentally` y confirma que el promedio de inversiones sobre 10,000 permutaciones aleatorias converge a:

```txt
E[inversiones] = n(n−1)/4
```

Una inversión es una pareja `(i, j)` donde `i < j`, pero `A[i] > A[j]`.

## Output código

```txt
Verificando E[inversiones] = n(n−1)/4:

  n  | Teórico n(n-1)/4 | Simulado (10k) | ¿Coinciden?
  ---|-----------------|----------------|------------
  3  | 1.5             | 1.508          | ✓
  4  | 3               | 2.987          | ✓
  5  | 5               | 5.021          | ✓
  6  | 7.5             | 7.486          | ✓
  8  | 14              | 13.962         | ✓
  10 | 22.5            | 22.531         | ✓

Máximo de inversiones (arreglo invertido) = C(n,2) = n(n-1)/2:
  n=4: 4,3,2,1 → 6 inversiones (max C(4,2)=6)
  n=5: 5,4,3,2,1 → 10 inversiones (max C(5,2)=10)
  n=6: 6,5,4,3,2,1 → 15 inversiones (max C(6,2)=15)
```

## Análisis

Una inversión ocurre cuando existe un par de posiciones `(i, j)` tal que `i < j`, pero el valor que aparece antes es mayor que el valor que aparece después.

Es decir:

```txt
A[i] > A[j]
```

Para contar el número esperado de inversiones, se puede usar variables aleatorias indicadoras.

Sea `Xᵢⱼ = 1` si el par `(i, j)` es una inversión, y `Xᵢⱼ = 0` si no lo es.

Entonces:

```txt
Xᵢⱼ = 1 si i < j y A[i] > A[j]
```

Como la lista `A` es una permutación aleatoria uniforme de los números `[1..n]`, para cualquier par de posiciones `i < j`, los valores `A[i]` y `A[j]` tienen la misma probabilidad de aparecer en cualquier orden.

Por lo tanto:

```txt
P(A[i] > A[j]) = 1/2
```

Entonces, la esperanza de cada variable indicadora es:

```txt
E[Xᵢⱼ] = P(Xᵢⱼ = 1) = 1/2
```

## Cálculo del total esperado

El total de inversiones se puede escribir como la suma de todas las variables indicadoras:

```txt
X = Σᵢ<ⱼ Xᵢⱼ
```

Aplicando linealidad de la esperanza:

```txt
E[X] = E[Σᵢ<ⱼ Xᵢⱼ]
```

```txt
E[X] = Σᵢ<ⱼ E[Xᵢⱼ]
```

Como cada par tiene probabilidad `1/2` de ser inversión:

```txt
E[X] = Σᵢ<ⱼ 1/2
```

Ahora, la cantidad de pares `(i, j)` con `i < j` es:

```txt
C(n, 2) = n(n−1)/2
```

Por lo tanto:

```txt
E[X] = C(n, 2) · 1/2
```

```txt
E[X] = (n(n−1)/2) · 1/2
```

```txt
E[inversiones] = n(n−1)/4
```

## Verificación con la simulación

En la simulación se generaron permutaciones aleatorias y se contó el número de inversiones en cada una. Luego, se calculó el promedio de inversiones obtenidas.

Los resultados simulados se acercan bastante al valor teórico.

Por ejemplo, para `n = 6`:

```txt
E[inversiones] = 6(6−1)/4
```

```txt
E[inversiones] = 30/4 = 7.5
```

El valor simulado fue aproximadamente `7.486`, que está muy cerca del valor esperado.

Para `n = 10`:

```txt
E[inversiones] = 10(10−1)/4
```

```txt
E[inversiones] = 90/4 = 22.5
```

El valor simulado fue aproximadamente `22.531`, lo cual también coincide con el valor teórico.

## Máximo de inversiones

El máximo número de inversiones ocurre cuando el arreglo está completamente invertido, es decir, en orden descendente.

Por ejemplo:

```txt
n = 4
A = [4, 3, 2, 1]
```

En este caso, todos los pares posibles son inversiones.

La cantidad máxima de inversiones es:

```txt
C(n, 2) = n(n−1)/2
```

Para `n = 4`:

```txt
C(4, 2) = 4(3)/2 = 6
```

Para `n = 5`:

```txt
C(5, 2) = 5(4)/2 = 10
```

Para `n = 6`:

```txt
C(6, 2) = 6(5)/2 = 15
```

Esto coincide con los resultados del código, donde los arreglos invertidos tienen exactamente el máximo número posible de inversiones.

## Conclusión

Así pues, el número esperado de inversiones en una permutación aleatoria de tamaño `n` es:

```txt
E[inversiones] = n(n−1)/4
```

La simulación confirma que el promedio de inversiones se acerca al valor teórico. Además, el uso de variables indicadoras permite resolver el problema de forma sencilla, porque solo se analiza cada par `(i, j)` de manera individual y luego se suman sus esperanzas usando linealidad.
