
import path from 'path'
import fsp from 'fs-promise'
import ApiProxy from './ApiProxy'


export const handlers = {

  async fetchGallery() {

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

}


const api = new ApiProxy(function(methodName, params) {
  return handlers[methodName](params)
})


export default api