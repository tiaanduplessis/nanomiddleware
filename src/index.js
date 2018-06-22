
class Middleware {
  constructor (fns) {
    this.fns = []

    if (fns) {
      this.use(fns)
    }
  }

  use (fn, {before = false} = {}) {
    if (fn === undefined || fn === null) {
      return
    }

    if (fn instanceof Middleware) {
      this.use(fn.fns)
      return
    }

    if (Array.isArray(fn)) {
      fn.forEach(fn => this.use(fn))
      return
    }

    if (fn.then || typeof fn === 'function') {
      before ? this.fns.unshift(fn) : this.fns.push(fn)
      return
    }

    before ? this.fns.unshift(() => fn) : this.fns.push(() => fn)
  }

  run (...args) {
    return this.fns.reduce(chain, Promise.resolve(...args))
  }
}

function chain (promise, task) {
  return promise.then(task)
}

export default Middleware
