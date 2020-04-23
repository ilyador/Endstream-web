let images = {}
let imageArray = []


function importAll (imported) {
  imported.keys().forEach(img => {
    let key = img.substr(0, img.lastIndexOf('.')).replace('./', '')
    images[key] = imported(img)
    imageArray.push(img)
  })
}

importAll(require.context('./img/illustrations', true, /\.(png|jpe?g|svg|webp)$/))


export { images, imageArray }
