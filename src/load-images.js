function importAll (r) {
  let images = {}
  r.keys().map((item, _) => { images[item.replace('./', '')] = r(item) })
  return images
}

const images = importAll(require.context('./img/illustrations', false, /\.(png|jpe?g|svg|webp)$/))
const imageArray = Object.keys(images).map((imgUrl, index) => images[imgUrl])

export { images, imageArray }