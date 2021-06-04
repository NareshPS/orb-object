/**
 * Copies the input object.
 * 
 * @param {Object} o 
 * @returns {Object}
 */
const copy = o => Object.assign({}, o)

/**
 * It computes the type of an object.
 * The types are classified as object, array, primitive, undefined, null or unknown.
 * 
 * object: A Javascript Object which is not an array or a null.
 * array: An Array Object
 * primitive: One of bigint, boolean, number or string.
 * undefined: undefined.
 * null: null
 * unknown: Anything else.
 * 
 * @param {Object} o 
 * @returns {String}
 */
 const type = o => {
  const t = typeof o

  switch(t) {
    case 'object':
      return (o instanceof Array)? "array": o != null? "object": "null"
    case 'bigint':
    case 'boolean':
    case 'number':
    case 'string':
      return 'primitive'
    case 'undefined':
      return 'undefined'
    default:
      return 'unknown'
  }
}

/**
 * A collection of functions to determine the type of an object.
 */
const is = {
  object: o => type(o) === 'object',
  array: o => type(o) === 'array',
  primitive: o => type(o) === 'primitive',
  undefined: o => type(o) === 'undefined',
  null: o => type(o) === 'null'
}

const trim = (v = {}, depth = 3) => {
  const t = type(v)

  switch(t) {
    case 'object': {
      return depth <= 0
      ? '.'
      : Object.entries(v).reduce((container, [key, value]) => (container[key] = trim(value, depth-1), container), {})
    }
    case 'array':
      return v.map((vi) => trim(vi, depth-1))
    default:
      return v
  }
}

const gobject = o => {
  const t = type(o)

  switch(t) {
    case 'object':
    case 'array':
      return o
    case 'primitive':
      return [o]
    case 'undefined':
    case 'null':
    default:
      return []
  }
}

module.exports = {copy, is, trim, type, gobject}