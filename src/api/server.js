
import path from 'path'
import fsp from 'fs-promise'


export var fetchGallery = async function() {

  const resourcesRoot = path.join(__dirname, '../../resources')
  const galleryRoot = '/images/content/galleri'

  const imageFiles = await fsp.readdir(path.join(resourcesRoot, galleryRoot))

  const images = imageFiles
    .filter((imageFile) => {
      return imageFile.match(/jpg|png/)
    })
    .map((imageFile) => {
      return { url: path.join(galleryRoot, imageFile) }
    })

  return images
}

