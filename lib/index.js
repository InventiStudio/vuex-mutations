/**
 * @module Mutations
 * @desc Collection of functions that create mutations
 */

const props = require('dot-prop');
const array = require('./array')

///////////////////////////
// DEFAULTS
///////////////////////////

const defaults = {
  position: 'first',
  matchBy:  (a, b) => a === b
}

///////////////////////////
// HELPERS
///////////////////////////

function getIndexOfMatchedElement(matchBy, collection, element) {
  matchByFunction = typeof matchBy === 'function'
    ? matchBy
    : (a, b) => props.get(a, matchBy) === props.get(b, matchBy)
  return collection.indexOf(collection.find(item => matchByFunction(item, element)))
}

function mutate(path, state, updateFunction)  {
  return props.set(state, path, updateFunction(props.get(state, path)))
}

///////////////////////////
// MUTATIONS
///////////////////////////

/**
 * @static
 * @desc It creates mutation that adds element to array
 * @param {String} path Path to array
 * @param {Object} options
 * @param {String} [options.position='first'] Determine if element should be inserted at the beginning ('first') or end ('last')
 * @returns {Mutation(state, element)}
 * @example
 * const mutations = {
 *   ADD_USER:        add('users'),
 *   ADD_USER_AT_END: add('users', { position: 'last' }),
 * }
 */
const add = function add (path, options) {
  options = options || {
    position: defaults.position,
  }
  return function(state, value) {
    mutate(path, state, (collection) => array.add(collection, options.position, value))
  }
}

/**
 * @static
 * @desc It creates mutation that updates element of array. It does nothing if not found
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
    mutate(path, state, (collection) => {
      const  index = getIndexOfMatchedElement(options.matchBy, collection, value)
      return index !== -1
        ? array.replace(collection, index, value)
        : collection
    })
  }
}

/**
 * @static
 * @desc It creates mutation that updates element of array if found. It adds it if not.
 * @param {String} path Path to array
 * @param {Object} options
 * @param {String} [options.position='first'] Determine if element should be inserted at the beginning ('first') or end ('last')
 * @param {Function|String} [options.matchBy=(a, b) => a === b] It can by function or propery name
 * @returns {Mutation(state, element)}
 * @example
 * const mutations = {
 *   UPDATE_OR_ADD_BY_REFERENCE:   addOrUpdate('path.to.array'),
 *   UPDATE_OR_ADD_BY_ID:          addOrUpdate('path.to.array', { matchBy: 'data.id', position: 'last' }),
 *   UPDATE_OR_ADD_BY_CUSTOM_FUNC: addOrUpdate('path.to.array', { matchBy(a, b) { return a.name === b.name } }),
 * }
 */
const addOrUpdate = function addOrUpdate (path, options) {
  options = options || {
    matchBy:  defaults.matchBy,
    position: defaults.position,
  }
  return function(state, value) {
    mutate(path, state, (collection) => {
      const  index = getIndexOfMatchedElement(options.matchBy, collection, value)
      return index !== -1
        ? array.replace(collection, index, value)
        : array.add(collection, options.position, value)
    })
  }
}

/**
 * @static
 * @desc It creates mutation that removes element from array. It does nothing if not found
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
    mutate(path, state, (collection) => {
      const  index = getIndexOfMatchedElement(options.matchBy, collection, value)
      return index !== -1
        ? array.remove(collection, index)
        : collection
    })
  }
}

/**
 * @static
 * @desc It creates mutation that sets object property.
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
