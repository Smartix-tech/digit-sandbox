#  Brain Sandbox

Esta IA tem como objetivo detectar a letra escrita em uma resolução fixa de 28x28 (myDraw.png).

Ela também consegue gerar imagens de letras conforme parâmetros passados.

## Para começar

```
npm install
```

## Base de imagens para testes
É possível utilizar a base de imagens deste projeto para seu próprio treinamento, basta utilizar o código abaixo:
```
const jimp = require('./jimp.js')
jimp.importImages(true) //true = ensinar a reconhecer imagem / false = ensinar a ia a desenhar imagem
```


## Detectando letra do desenho

No arquivo "brain-recognition-image.js", é possível alterar os parâmetros logo no inicio:
```
const reference = "reference.png"
```

Executando IA:
```
npm run recog
```

Exemplo de imagem importada:
![](reference.png?raw=true)


O resultado é algo como:
```
resultado ia:  {
  a: 0.004067374859005213,
  b: 0.0019338042475283146,
  c: 0.0006801215349696577,
  d: 0.0033412999473512173,
  e: 0.022036444395780563,
  f: 0.4288484752178192,
  g: 0.0003108947421424091,
  h: 0.009119945578277111,
  i: 0.0023492721375077963,
  j: 0.0017413325840607285,
  k: 0.00503690168261528,
  l: 0.00674082525074482,
  m: 0.023624932393431664,
  n: 0.0064698075875639915,
  o: 0.003983114380389452,
  p: 0.5680020451545715,
  q: 0.0006832376820966601,
  r: 0.012027530930936337,
  s: 0.11166821420192719,
  t: 0.06315122544765472,
  u: 0.0010677626123651862,
  v: 0.004210434388369322,
  w: 0.0003029266663361341,
  x: 0.11667484045028687,
  y: 0.002373057184740901,
  z: 0.00014163405285216868,
  _: 0.0025208566803485155
}
letra detectada:  p
```
O "resultado da IA" é a probabilidade de ser cada letra do alfabeto

## Gerando nova letra

No arquivo "brain-draw-image.js", é possível alterar os parâmetros logo no inicio:
```
const str = 'meu texto';
const exportFile = 'export-ia.png';
```

Executando IA:
```
npm run draw
```


Exemplo de texto digitado:
```
'meu texto'
```

Exemplo de imagem gerada:
![](export-ia.png?raw=true)

## Licença
MIT