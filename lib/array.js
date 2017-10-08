function add(arr, position, el) {
  return position === 'first'
    ? [el, ...arr]
    : [...arr, el]
}

function replace(arr, index, newEl) {
  const newArr = arr.slice()
  newArr.splice(index, 1, newEl)
  return newArr
}

function remove(arr, index) {
  const newArr = arr.slice()
  newArr.splice(index, 1)
  return newArr
}

module.exports = {
  add,
  replace,
  remove,
}
