# orb-object
We expose concise APIs for object manipulation.

# Installation
Browser Installation. The module is exported as *orbo* global variable.

```html
<script src="https://cdn.jsdelivr.net/npm/orb-object@1.0.0/dist/index.js"></script>
```

Node Installation
```js
npm install orb-object
```

# Details
*orb-object* types:
* object: A JS object which is not an array or a null.
* array: An Array.
* primitive: JS types: bigint, boolean, number or string.
* undefined: undefined.
* null: null
* unknown: Anything else like function or symbol etc.

# APIs
## copy
It performs a shallow copy of the input.
```js
const o = {name: "copy", desc: "Shallow copies an object"}
const copied = copy(o) // A new container object is created to house the contents of o.
// Output: {name: "copy", desc: "Shallow copies an object"}
```

## type
It classifies the input as one of the *orb-object* types.
```js
const t = type(5)
// Output: primitive

const t = type('orb-array')
// Output: primitive

const t = type(['orb-array'])
// Output: array

const t = type({name: 'orb-array'})
// Output: object
```

## is
*is* contains methods to perform type tests.
```js
const istype = is.array([])
// Output: true

const istype = is.array({})
// Output: false

const istype = is.primitive('orb-array')
// Output: true
```

## trim
*trim* trims a complex object based on the **depth** argument. It is perfect for situations that require a complex object to be logged. The default depth is 3.
```js
const o = {name: 'orb-array', address: {house: 25, street: "ABC Street"}}
const r = trim(o, 1)
// Output: {name: 'orb-array', address: '.'}

const o = {name: 'orb-array', address: {house: 25, street: "ABC Street"}}
const r = trim(o)
// Output: {name: 'orb-array', address: {house: 25, street: "ABC Street"}}
```

## gobject
*gobject* is short for **good object**. It transform an object as follows:
* When the input is an array or an object, it is returned as-is.
* When the input is a primitive, it is placed in an array.
* When the input is null, undefined or unknown, an empty array is returned.
```js
const o = ['orb-object', 1]
const goed = gobject(o)
// Output: ['orb-object', 1]

const o = 'orb-object'
const goed = gobject(o)
// Output: ['orb-object']

const o = null
const goed = gobject(o)
// Output: []
```
