const where = require('filter-where')
const curry = require('curry')
const props = require('dot-prop');

const defaults = {
  position: 'first',
  matchBy:  (a, b) => a === b
}

function matchIndex(matchBy, arr, obj) {
  matchBy = typeof matchBy === 'function'
    ? matchBy
    : (a, b) => props.get(a, matchBy) === props.get(b, matchBy)
  return arr.indexOf(arr.find(el => matchBy(el, obj)))
}

function get(path, obj) {
  const value = props.get(obj, path)
  if (!value) {
    throw new Error(`Can't find ${stateArrayPath} inside state`)
  } else {
    return value
  }
}

function mutate(path, obj, updateFunction)  {
  return props.set(obj, path, updateFunction(get(path, obj)))
}

const add = function add (path, options) {
  options = options || {
    position: defaults.position,
  }
  return function(state, value) {
    mutate(path, state, (arr) => options.position === 'first'
      ? [value, ...arr]
      : [...arr, value]
    )
  }
}

const update = function update (path, options) {
  options = options || {
    matchBy: defaults.matchBy
  }
  return function(state, value) {
    mutate(path, state, (arr) => arr.slice().splice(
      matchIndex(options.matchBy, arr, value),
      1,
      value,
    ))
  }
}

module.exports = {
  add,
  update,
}
