const Vuex       = require('vuex')
const Vue        = require('vue')
const chai       = require('chai')
const mutations  = require('./index')
const expect     = chai.expect

function newStore(state, mutations) {
  Vue.use(Vuex)
  return new Vuex.Store({
    state: JSON.parse(JSON.stringify(state)),
    mutations,
  })
}

const state = {
  users: [
    { id: '1', name: 'Mike' },
  ]
}

describe('common', () => {
  it('mutates nested path', () => {
    const store = newStore({
      some: {
        nested: {
          data: [],
        }
      }
    }, {
      ADD_USER: mutations.add('some.nested.data')
    })
    store.commit('ADD_USER', { id: '2', name: 'John' })
    expect(store.state.some.nested).to.deep.equal({
      data: [
        { id: '2', name: 'John' },
      ],
    })
  });
});

describe('add', () => {

  it('adds new element', () => {
    const store = newStore(state, {
      ADD_USER: mutations.add('users')
    })
    store.commit('ADD_USER', { id: '2', name: 'John' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '2', name: 'John' },
        { id: '1', name: 'Mike' },
      ],
    })
    store.commit('ADD_USER', { id: '3', name: 'Eva' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '3', name: 'Eva'  },
        { id: '2', name: 'John' },
        { id: '1', name: 'Mike' },
      ],
    })
  });

  it('adds new element at the beginning of array', () => {
    const store = newStore(state, {
      ADD_USER: mutations.add('users', { position: 'first' })
    })
    store.commit('ADD_USER', { id: '2', name: 'John' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '2', name: 'John' },
        { id: '1', name: 'Mike' },
      ],
    })
  });

  it('adds new element at the beginning of array', () => {
    const store = newStore(state, {
      ADD_USER: mutations.add('users', { position: 'last' })
    })
    store.commit('ADD_USER', { id: '2', name: 'John' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '1', name: 'Mike' },
        { id: '2', name: 'John' },
      ],
    })
  });

});
