const brain = require('brain.js')
const Jimp = require('jimp')
const {imageToArray, importImages} = require('./jimp')
const reference = "reference.png";

(async () => {
  console.log("importando imagens para treinamento...")

  var testSet = await importImages(true)

  console.log("treinando ia...")
  const net = new brain.NeuralNetwork();
  net.train(testSet, {
    iterations: 20000,
    learningRate: 0.05,
    log: detail => console.log(detail)
  });

  console.log("rodando ia...")
  var dataImage = await imageToArray(reference)
  const result = brain.likely(dataImage, net);
  const result2 = net.run(dataImage)
  
  console.log('resultado ia: ', result2)
  console.log('letra detectada: ', result);
})()
