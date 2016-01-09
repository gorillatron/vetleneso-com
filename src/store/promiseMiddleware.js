
export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, ...rest } = action

    if (!promise) return next(action)

    const RESOLVE = type + '_RESOLVE'
    const PENDING = type + '_PENDING'
    const REJECT = type + '_REJECT'

    next({ ...rest, type: PENDING })

    return promise
      .then(value => {
        next({ ...rest, value, type: RESOLVE })
        return true
      })
      .catch(error => {
        next({ ...rest, error, type: REJECT })
        return false
      })
  }
}