let illustrations = {}
let imageArray = []


function importAll (imported) {
  imported.keys().forEach(img => {
    let key = img.substr(0, img.lastIndexOf('.')).replace('./', '')
    illustrations[key] = imported(img)
    imageArray.push(img)
  })
}

importAll(require.context('../img/illustrations', true, /\.(png|jpe?g|svg|webp)$/))


export { illustrations, imageArray }
