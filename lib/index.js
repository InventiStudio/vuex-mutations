/**
 * @module mutations
 * @desc Collection of functions that creates mutations
 */

const props = require('dot-prop');
const array = require('./array')

const defaults = {
  position: 'first',
  matchBy:  (a, b) => a === b
}

function matchIndex(matchBy, arr, obj) {
  matchByFunction = typeof matchBy === 'function'
    ? matchBy
    : (a, b) => props.get(a, matchBy) === props.get(b, matchBy)
  return arr.indexOf(arr.find(el => matchByFunction(el, obj)))
}

function mutate(path, obj, updateFunction)  {
  return props.set(obj, path, updateFunction(props.get(obj, path)))
}

/**
 * @static
 * @desc It creates mutation that adds element to array
 * @param {String} path Path to array
 * @param {Object} options
 * @param {String} [options.position='first'] Determine if element should be inserted at the beginning ('first') or end ('last')
 * @returns {Mutation(state, element)}
 * @example
 * const mutations = {
 *   ADD_USER:        update('users'),
 *   ADD_USER_AT_END: update('users', { position: 'last' }),
 * }
 */
const add = function add (path, options) {
  options = options || {
    position: defaults.position,
  }
  return function(state, value) {
    mutate(path, state, (arr) => array.add(arr, options.position, value))
  }
}

/**
 * @static
 * @desc It creates mutation that update element of array. It does nothing if not found
 * @param {String} path Path to array
 * @param {Object} options
 * @param {Function|String} [options.matchBy=(a, b) => a === b] It can by function or propery name
 * @returns {Mutation(state, element)}
 * @example
 * const mutations = {
 *   UPDATE_BY_REFERENCE:   update('path.to.array'),
 *   UPDATE_BY_ID:          update('path.to.array', { matchBy: 'id' }),
 *   UPDATE_BY_CUSTOM_FUNC: update('path.to.array', { matchBy(a, b) { return a.name === b.name } }),
 * }
 */
const update = function update (path, options) {
  options = options || {
    matchBy: defaults.matchBy
  }
  return function(state, value) {
    mutate(path, state, (arr) => {
      const index = matchIndex(options.matchBy, arr, value)
      if(index !== -1) {
        return array.replace(arr, index, value)
      } else {
        return arr
      }
    })
  }
}

/**
 * @static
 * @desc It creates mutation that update element of array if found. It adds it if not.
 * @param {String} path Path to array
 * @param {Object} options
 * @param {String} [options.position='first'] Determine if element should be inserted at the beginning ('first') or end ('last')
 * @param {Function|String} [options.matchBy=(a, b) => a === b] It can by function or propery name
 * @returns {Mutation(state, element)}
 * @example
 * const mutations = {
 *   UPDATE_OR_ADD_BY_REFERENCE:   update('path.to.array'),
 *   UPDATE_OR_ADD_BY_ID:          update('path.to.array', { matchBy: 'data.id', position: 'last' }),
 *   UPDATE_OR_ADD_BY_CUSTOM_FUNC: update('path.to.array', { matchBy(a, b) { return a.name === b.name } }),
 * }
 */
const addOrUpdate = function addOrUpdate (path, options) {
  options = options || {
    matchBy:  defaults.matchBy,
    position: defaults.position,
  }
  return function(state, value) {
    mutate(path, state, (arr) => {
      const index = matchIndex(options.matchBy, arr, value)
      if(index !== -1) {
        return array.replace(arr, index, value)
      } else {
        return array.add(arr, options.position, value)
      }
    })
  }
}

/**
 * @static
 * @desc It creates mutation that remove element from array. It does nothing if not found
 * @param {String} path Path to array
 * @param {Object} options
 * @param {Function|String} [options.matchBy=(a, b) => a === b] It can by function or propery name
 * @returns {Mutation(state, element)}
 * @example
 * const mutations = {
 *   REMOVE_BY_REFERENCE:   remove('path.to.array'),
 *   REMOVE_BY_ID:          remove('path.to.array', { matchBy: 'id' }),
 *   REMOVE_BY_CUSTOM_FUNC: remove('path.to.array', { matchBy(a, b) { return a.name === b.name } }),
 * }
 */
const remove = function remove (path, options) {
  options = options || {
    matchBy: defaults.matchBy
  }
  return function(state, value) {
    mutate(path, state, (arr) => {
      const index = matchIndex(options.matchBy, arr, value)
      if(index !== -1) {
        return array.remove(arr, index)
      } else {
        return arr
      }
    })
  }
}

/**
 * @static
 * @desc It creates mutation that set object property.
 * @param {String} path Path to property
 * @returns {Mutation(state, element)}
 * @example
 * const mutations = {
 *   SET_SOMETHING: set('path.to.prop'),
 * }
 */
const set = function set (path) {
  return function(state, value) {
    mutate(path, state, () => value)
  }
}

module.exports = {
  add,
  update,
  addOrUpdate,
  remove,
  set,
}
