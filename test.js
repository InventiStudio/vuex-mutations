const Vuex       = require('vuex')
const Vue        = require('vue')
const chai       = require('chai')
const mutations  = require('./lib/index')
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
    { id: '0', name: 'James' },
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
        { id: '2', name: 'John'  },
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike'  },
      ],
    })
    store.commit('ADD_USER', { id: '3', name: 'Eva' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '3', name: 'Eva'   },
        { id: '2', name: 'John'  },
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike'  },
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
        { id: '2', name: 'John'  },
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike'  },
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
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike'  },
        { id: '2', name: 'John'  },
      ],
    })
  });

});

describe('update', () => {
  it('updates element in array by id', () => {
    const store = newStore(state, {
      UPDATE_USER: mutations.update('users', { matchBy: 'id' })
    })
    store.commit('UPDATE_USER', { id: '1', name: 'Newname' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '0', name: 'James'   },
        { id: '1', name: 'Newname' },
      ],
    })
  });

  it('updates element in array by custom function', () => {
    const store = newStore(state, {
      UPDATE_USER: mutations.update('users', { matchBy: (a, b) => a.name === b.name })
    })
    store.commit('UPDATE_USER', { id: '999', name: 'James' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '999', name: 'James' },
        { id: '1', name: 'Mike' },
      ],
    })
  });

  it('does not mutate state if element not found', () => {
    const store = newStore(state, {
      UPDATE_USER: mutations.update('users', { matchBy: 'id' })
    })
    store.commit('UPDATE_USER', { id: '999', name: 'Newname' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike' },
      ],
    })
  });
});

describe('addOrUpdate', () => {
  it('adds new element to array if not found', () => {
    it('does not mutate state if element not found', () => {
      const store = newStore(state, {
        UPDATE_USER: mutations.addOrUpdate('users', { matchBy: 'id' })
      })
      store.commit('UPDATE_USER', { id: '999', name: 'Newname' })
      expect(store.state).to.deep.equal({
        users: [
          { id: '999', name: 'Newname' },
          { id: '0', name: 'James' },
          { id: '1', name: 'Mike' },
        ],
      })
    });
  });
});

describe('remove', () => {
  it('removes element from array by id', () => {
    const store = newStore(state, {
      REMOVE_USER: mutations.remove('users', { matchBy: 'id' })
    })
    store.commit('REMOVE_USER', { id: '1' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '0', name: 'James' },
      ],
    })
  });

  it('does not mutate state if element not found', () => {
    const store = newStore(state, {
      REMOVE_USER: mutations.remove('users', { matchBy: 'id' })
    })
    store.commit('REMOVE_USER', { id: '999', name: 'Newname' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike' },
      ],
    })
  });
});

describe('set', () => {
  it('sets value', () => {
    const store = newStore({
      ui: {
        focusedUserId: null,
      }
    }, {
      SET_FOCUSED_USER_ID: mutations.set('ui.focusedUserId')
    })
    store.commit('SET_FOCUSED_USER_ID', 10)
    expect(store.state.ui.focusedUserId).to.equal(10)
  });
});
