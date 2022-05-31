const brain = require('brain.js')
const Jimp = require('jimp')
const {importImages, generateImage} = require('./jimp')

const str = 'meu texto';
const exportFile = 'export-ia.png';

(async () => {
  console.log("importando imagens para treinamento...")
  var testSet = await importImages(false)

  console.log("treinando ia...")
  const net = new brain.NeuralNetwork();
  net.train(testSet, {
    iterations: 300,
    learningRate: 0.05,
    log: detail => console.log(detail)
  });

  console.log("rodando ia...")
  
  var images = []
  for (var i = 0; i < str.length; i++) {
    var value = {}
    value[str.toLowerCase().charAt(i)] = 1
    const result2 = net.run(value)
    images.push(await generateImage(result2))
  }

  var exportImage = new Jimp(28 * images.length, 28)
  images.forEach((image, index) => {
    exportImage.composite(image, 28 * index, 0);
  })
  exportImage.write(`./${exportFile}`)

  console.log("imagem exportada com sucesso!")

})()
