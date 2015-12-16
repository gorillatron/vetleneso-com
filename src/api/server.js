
import path from 'path'
import fsp from 'fs-promise'


export const handlers = {

  async fetchGallery() {

    const resourcesRoot = path.join(__dirname, '../../resources')
    const galleryRoot = '/images/content/galleri'
    const thumbsRoot = '/images/content/galleri/thumbs'

    const imageFiles = await fsp.readdir(path.join(resourcesRoot, galleryRoot))

    const images = imageFiles
      .filter((fileName) => fileName.match(/jpg|png|gif/))
      .map((fileName) => {
        return { fileName,
                 imageUrl: path.join(galleryRoot, fileName),
                 thumbUrl: path.join(thumbsRoot, fileName)  }
      })

    return images
  }

}


const api = {

  callMethod(methodName, params) {
    return handlers[methodName](params)
  }

}


export default api