function add(collection, position, element) {
  return position === 'first'
    ? [element, ...collection]
    : [...collection, element]
}

function replace(collection, index, newElement) {
  const newCollection = collection.slice()
  newCollection.splice(index, 1, newElement)
  return newCollection
}

function remove(collection, index) {
  const newCollection = collection.slice()
  newCollection.splice(index, 1)
  return newCollection
}

module.exports = {
  add,
  replace,
  remove,
}
