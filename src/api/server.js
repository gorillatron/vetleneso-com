
import path from 'path'
import fsp from 'fs-promise'


export const handlers = {

  async fetchGallery() {

    const resourcesRoot = path.join(__dirname, '../../resources')
    const galleryRoot = '/images/content/galleri'

    const imageFiles = await fsp.readdir(path.join(resourcesRoot, galleryRoot))

    const images = imageFiles
      .filter(isImage)
      .map((imageFile) => {
        return { url: path.join(galleryRoot, imageFile) }
      })

    return images
  }

}


function isImage(file) {
  return file.match(/jpg|png|gif/)
}


const api = {

  callMethod(methodName, params) {
    return handlers[methodName](params)
  }

}


export default api