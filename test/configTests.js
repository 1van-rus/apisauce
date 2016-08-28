import test from 'ava'
import { create, DEFAULT_HEADERS } from '../lib/apisauce'
import { merge } from 'ramda'

const validConfig = {
  baseURL: 'http://localhost:9991',
  headers: { 'X-Testing': 'hello' }
}

test('is a function', t => {
  t.is(typeof create, 'function')
})

test('config must be an object and have a baseURL', t => {
  t.throws(() => create())
  t.throws(() => create(null))
  t.throws(() => create(2))
  t.throws(() => create([]))
})

test('config must have a valid baseURL', t => {
  t.throws(() => create({}))
  t.throws(() => create({baseURL: null}))
  t.throws(() => create({baseURL: ''}))
})

test('returns an object when we configure correctly', t => {
  const x = create(validConfig)
  t.truthy(x)
  t.truthy(x.axiosInstance)
})

test('configures axios correctly', t => {
  const apisauce = create(validConfig)
  const axios = apisauce.axiosInstance
  t.is(axios.defaults.timeout, 0)
  t.is(axios.defaults.baseURL, validConfig.baseURL)
  t.deepEqual(apisauce.headers, merge(DEFAULT_HEADERS, validConfig.headers))
})
