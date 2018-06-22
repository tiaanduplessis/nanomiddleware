
# nanomiddleware
[![package version](https://img.shields.io/npm/v/nanomiddleware.svg?style=flat-square)](https://npmjs.org/package/nanomiddleware)
[![package downloads](https://img.shields.io/npm/dm/nanomiddleware.svg?style=flat-square)](https://npmjs.org/package/nanomiddleware)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/nanomiddleware.svg?style=flat-square)](https://npmjs.org/package/nanomiddleware)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Simple middleware engine

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#License)

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com). 

```sh
$ npm install nanomiddleware
$ # OR
$ yarn add nanomiddleware
```

## Usage

```js
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

```

## Contribute

1. Fork it and create your feature branch: git checkout -b my-new-feature
2. Commit your changes: git commit -am 'Add some feature'
3. Push to the branch: git push origin my-new-feature 
4. Submit a pull request

## License

MIT
    