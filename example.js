import Middleware from 'nanomiddleware'

const mid = new Middleware()

function sleep (time = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, 500)
  })
}

mid.use(async function (...args) {
  await sleep()
  console.log(args)
  return 5
})

mid.use(async function (...args) {
  await sleep(1000)
  console.log(args)
  return 8
})

mid.use([1, 2, 3, 4, async function (...args) {
  await sleep(1000)
  console.log(args)
  return {success: true}
}])

mid.use(async function (...args) {
  await sleep(400)
  console.log('Ran first', args)
  return 100
}, {before: true})

mid.run('hi')
// Ran first [ 'hi' ]
// [ 100 ]
// [ 5 ]
// [ 4 ]
