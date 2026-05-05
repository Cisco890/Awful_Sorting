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


