
import request from 'request-promise'
import ApiProxy from './ApiProxy'


const api = new ApiProxy(function(methodName, params) {

  const uri = `/api/${methodName}`

  return fetch(uri)
    .then((response) => response.json())
})


export default api