import Middleware from '../'

function noopPromise () { return Promise.resolve(null) }

test('should be defined', () => {
  expect(Middleware).toBeDefined()
})

test('should add middleware to run', () => {
  const mid = new Middleware()

  mid.use([1, noopPromise, async function () {
    await noopPromise
  }])

  expect(mid.fns.length).toBe(3)
})

test('should run middleware function', async () => {
  const mid = new Middleware()
  const mocker = jest.fn()

  mid.use(async function (...args) {
    mocker(...args)
    return 5
  })

  mid.use(async function (...args) {
    mocker(...args)
    return 8
  })

  await mid.run()

  expect(mocker).toBeCalled()
})
