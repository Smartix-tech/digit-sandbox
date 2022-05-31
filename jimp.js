const Jimp = require('jimp')

const rgbToScaleOne = (rgba) => {
  var sum = rgba.r + rgba.g + rgba.b
  return sum / 765
}


const exportImage = (dataArray2, fileName) => {
  const col = x => Math.max(0, Math.min(255, (x * 255)));
  const image = new Jimp(28, 28);

  var dataImage = []
  dataArray2.forEach(value => {
    dataImage.push(col(value))
    dataImage.push(col(value))
    dataImage.push(col(value))
    dataImage.push(255)
  })
  
  image.bitmap.data = dataImage
  image.writeAsync(`./${fileName}.png`);
}

const generateImage = (dataArray2) => {
  const col = x => Math.max(0, Math.min(255, (x * 255)));
  const image = new Jimp(28, 28);

  var dataImage = []
  dataArray2.forEach(value => {
    dataImage.push(col(value))
    dataImage.push(col(value))
    dataImage.push(col(value))
    dataImage.push(255)
  })
  
  image.bitmap.data = dataImage
  return image
}

const importImage = async (fileName, isImageToChar) => {
  return new Promise((resolve, reject) => {
    Jimp.read('./images/' + fileName).then(image => {
      var w = image.bitmap.width;
      var h = image.bitmap.height;

      var dataImage = []

      for(var i=0;i<w;i++) {
        for (var j=0;j<h;j++) {
          var rgba = Jimp.intToRGBA(image.getPixelColor(j,i))
          var pixelData = rgbToScaleOne(rgba)
          dataImage.push(pixelData)
        }
      }

      const expectedValue = fileName.charAt(0)
      var output = {}
      output[expectedValue] = 1
      if (isImageToChar) {
        resolve({input: dataImage, output })
      } else {
        resolve({input: output, output: dataImage })
      }
    })
  })
}

const importImages = async (isImageToChar) => {
  const fs = require('fs');
  var dataSet = []

  var files = fs.readdirSync('./images/')
  for(var file of files) {
    dataSet.push(await importImage(file, isImageToChar))
  }
  return dataSet
}

const imageToArray = async (reference) => {
  const image = await Jimp.read(`./${reference}`)
  var dataImage = []

  var w = image.bitmap.width;
  var h = image.bitmap.height;

  for(var i=0;i<w;i++) {
    for (var j=0;j<h;j++) {
      var rgba = Jimp.intToRGBA(image.getPixelColor(j,i))
      var pixelData = rgbToScaleOne(rgba)
      dataImage.push(pixelData)
    }
  }
  return dataImage
}

module.exports = {exportImage, imageToArray, importImage, rgbToScaleOne, importImages, generateImage}