
import request from 'request-promise'


const api = {

  callMethod(methodName, params) {

    const uri = `/api/${methodName}`

    return fetch(uri)
      .then((response) => response.json())
  }

}


export default api