let illustrations = {}
let UI = {}
let imageArray = []


function importAll (collection, imported) {
  imported.keys().forEach(img => {
    let key = img.substr(0, img.lastIndexOf('.')).replace('./', '')
    collection[key] = imported(img)
    imageArray.push(img)
  })
}

importAll(illustrations, require.context('../img/illustrations', true, /\.(png|jpe?g|svg|webp)$/))
importAll(UI, require.context('../img/ui', true, /\.(png|jpe?g|svg|webp)$/))


export { illustrations, UI, imageArray }
