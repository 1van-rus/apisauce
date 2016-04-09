import test from 'ava'
import lib from '../lib/apisauce'
import createServer from './testServer'

const PORT = 9192
let server = null
test.before((t) => {
  server = createServer(PORT)
})

test.after('cleanup', (t) => {
  server.close()
})

const validConfig = {
  baseURL: `http://localhost:${PORT}`
}

test('reads the status code for 200s', (t) => {
  const x = lib.create(validConfig)
  return x.get('/number/201').then((response) => {
    t.is(response.status, 201)
  })
})

test('reads the status code for 400s', (t) => {
  const x = lib.create(validConfig)
  return x.get('/number/401').then((response) => {
    t.is(response.status, 401)
  })
})

test('reads the status code for 500s', (t) => {
  const x = lib.create(validConfig)
  return x.get('/number/501').then((response) => {
    t.is(response.status, 501)
  })
})
