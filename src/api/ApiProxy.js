

export default class ApiProxy {

  constructor(callHandler) {
    this.callHandler = callHandler
  }

  callMethod(methodName, params) {
    return this.callHandler(methodName, params)
  }

}