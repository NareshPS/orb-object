const test = require('ava')
const { copy, type, is, trim, gobject } = require('./index.js')

/////////////////////// copy [start] ///////////////////////
test('copy-no-args', t => {
  const r = copy()
  
  t.deepEqual(r, {})
})

test('copy-simple-object', t => {
  const o = {name: "copy", desc: "Shallow copies an object"}
  const r = copy(o)

  t.deepEqual(r, o)
})

test('copy-complex-object', t => {
  const o = {ob1: {name: "copy", desc: "Shallow copies an object"}}
  const r = copy(o)

  t.deepEqual(r, o)

  // Modify source object and verify that the copied (shallow copy) object is changed.
  o.ob1.name = "copy modified"
  t.is(r.ob1.name, o.ob1.name)
})
/////////////////////// copy [end] ///////////////////////

/////////////////////// type [start] ///////////////////////
test('type-no-args', t => {
  const tt = type()
  
  t.is(tt, 'undefined')
})

test('type-object', t => {
  // A regular object
  const o = {x: '5', y: '2'}
  const tt = type(o)
  
  t.is(tt, 'object')
})

test('type-array', t => {
  const o = [5, 2]
  const tt = type(o)
  
  t.is(tt, 'array')
})

test('type-null', t => {
  const tt = type(null)

  t.is(tt, 'null')
})

test('type-primitive-bigint', t => {
  const o = BigInt(5)
  const tt = type(o)

  t.is(tt, 'primitive')
})

test('type-primitive-number', t => {
  const o = Number(5)
  const tt = type(o)
  
  t.is(tt, 'primitive')
})

test('type-primitive-string', t => {
  const o = 'hello'
  const tt = type(o)
  
  t.is(tt, 'primitive')
})

test('type-primitive-undefined', t => {
  const o = undefined
  const tt = type(o)

  t.is(tt, 'undefined')
})

test('type-unknown', t => {
  const fn = _ => "hello"
  const tt = type(fn)
  
  t.is(tt, 'unknown')
})
/////////////////////// type [end] ///////////////////////

/////////////////////// is.<methods> [start] ///////////////////////
test('is-object', t => {
  t.truthy(is.object({}))
  t.falsy(is.object())
})

test('is-array', t => {
  t.truthy(is.array([]))
  t.falsy(is.array())
})

test('is-null', t => {
  t.truthy(is.null(null))
  t.falsy(is.null())
})

test('is-primitive', t => {
  t.truthy(is.primitive("hello"))
  t.truthy(is.primitive(123n))
  t.truthy(is.primitive(123))
  t.truthy(is.primitive(true))
  t.falsy(is.primitive())
})

test('is-undefined', t => {
  t.truthy(is.undefined())
  t.truthy(is.undefined(undefined))
})
/////////////////////// is.<methods> [end] ///////////////////////

/////////////////////// trim [start] ///////////////////////
test('trim-no-args', t => {
  const trimmed = trim()

  t.deepEqual(trimmed, {})
})

test('trim-empty-object', t => {
  const o = {}
  const trimmed = trim(o)

  t.deepEqual(trimmed, {})
})

test('trim-shallow-object', t => {
  const o = {name: 'naresh', address: {house: 14, street: "Rue Phnompheng"}}
  const trimmed = trim(o)

  t.deepEqual(trimmed, o)
})

test('trim-deep-object', t => {
  const o = {name: 'naresh', address: {house: 14, street: "Rue Phnompheng"}}
  const trimmed = trim(o, 1)

  t.deepEqual(trimmed, {name: o.name, address: '.'})
})
/////////////////////// trim [end] ///////////////////////

/////////////////////// gobject [start] ///////////////////////
test('gobject-no-args', t => {
  const goed = gobject()

  t.deepEqual(goed, [])
})

test('gobject-empty-array', t => {
  const o = []
  const goed = gobject(o)

  t.deepEqual(goed, o)
})

test('gobject-array', t => {
  const o = ['hello', 1]
  const goed = gobject(o)

  t.deepEqual(goed, o)
})

test('gobject-empty-object', t => {
  const o = {}
  const goed = gobject(o)

  t.deepEqual(goed, o)
})

test('gobject-object', t => {
  const o = {name: 'naresh', address: {room: 5, street: "14 Rue Phnompheng"}}
  const goed = gobject(o)

  t.deepEqual(goed, o)
})

test('gobject-primitive', t => {
  const o = 'hello'
  const goed = gobject(o)

  t.deepEqual(goed, [o])
})

test('gobject-undefined', t => {
  const goed = gobject(undefined)

  t.deepEqual(goed, [])
})

test('gobject-null', t => {
  const goed = gobject(null)

  t.deepEqual(goed, [])
})
/////////////////////// gobject [end] ///////////////////////