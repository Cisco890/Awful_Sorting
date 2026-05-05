# 1. Implementa bozoSortOptStep y guessSortStep. Ejecuta la comparación y observa: ¿cuántos pasos desperdicia bozo-sort⁺_opt (pasos sin swap)? ¿Por qué guess-sort siempre tiene swaps/pasos ≈ 1?

### Output código:
Comparación (promedio de 100 ensayos):
bozo-sort+_opt: 179 pasos, 11 intercambios
guess-sort:     165 comparaciones, 11 intercambios
C(n,2) = 28 — esperado para intercambios

¿Por qué guess-sort mejora? Siempre intercambia pares malos.

### Respuesta a las preguntas:
Los pasos que desperdicio bozoSortOptStep son 179 - 11 = 168. Esta es la cantidad de pasos que se realizan sin que hagan un cambio útil (aproximadamente el 93.85%). Esto ocurre porque elige pares al azar y la mayoría de las veces selecciona elementos que ya están en orden, así que no hace nada.

Guess-sort siempre tiene swaps/pasos ≈ 1 porque no elige pares al azar, solamente selecciona pares que están mal ordenados. Por esta razón cada comparación detecta un error y cada paso produce un intercambio (el número de pasos dividido el númeor de swaps es aproximadamente 1).

# 2. Implementa funSort y verifica el runtime: (1) input casi ordenado (F pequeño) → O(n log n), (2) permutación aleatoria → O(n² log n). Calcula el umbral del Teorema 6 para n=8 y compara con E[F]=n(n-1)/4.

### Output código:
Input: [3,1,4,1,5,9,2,6]
  F=8, comparaciones=15, swaps=8, O((n+F)logn)=48
  Ordenado: [1,1,2,3,4,5,6,9]
 
Input: [1,2,3,4,5,6,7,8]
  F=0, comparaciones=12, swaps=0, O((n+F)logn)=24
  Ordenado: [1,2,3,4,5,6,7,8]
 
Input: [8,7,6,5,4,3,2,1]
  F=28, comparaciones=12, swaps=28, O((n+F)logn)=108
  Ordenado: [1,2,3,4,5,6,7,8]
 
E[F] simulado (n=8): 14.03
E[F] teórico n(n-1)/4: 14
Umbral Teorema 6 (F = o(n²/logn)): 21

### Respuesta a las preguntas:
Los resultados muestran que funSort ordena correctamente y que el número de “swaps” coincide con el número de inversiones F, lo cual valida que el algoritmo está capturando el grado de desorden de la entrada. Se observa que las comparaciones se mantienen del orden de nlog⁡(n) en todos los casos. Sin embargo, el costo adicional asociado al desorden se refleja en los swaps: cuando F es pequeño, el trabajo extra es bajo, mientras que en el caso reverso es máximo. Además, el valor esperado E[F]=14 para permutaciones aleatorias queda por debajo del umbral teórico (~21 para n=8), lo que confirma que en promedio el algoritmo opera en una región eficiente. En conjunto, esto demuestra que el rendimiento depende del nivel de desorden de la entrada, aunque en esta versión esto se refleja más en los intercambios que en las comparaciones.