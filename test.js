const Vuex       = require('vuex')
const Vue        = require('vue')
const chai       = require('chai')
const mutations  = require('./lib/index')
const expect     = chai.expect

Vue.use(Vuex)

function newStore(state, getters, mutations) {
  return new Vuex.Store({
    state: JSON.parse(JSON.stringify(state)),
    getters,
    mutations,
  })
}

function watchForReactiveChange({ store, getterName = 'getUsers', onChange }) {
  new Vue({
    store,
    computed: Vuex.mapGetters([getterName]),
    watch: {
      [getterName](value) {
        onChange(value)
      }
    }
  })
}

const defaultState = {
  users: [
    { id: '0', name: 'James' },
    { id: '1', name: 'Mike' },
  ]
}

const defaultGetters = {
  getUsers(state) { return state.users },
}

describe('common', () => {
  it('mutates nested path', (done) => {
    const store = newStore({
      some: {
        nested: {
          data: [],
        }
      }
    }, {
      getUsers(state) { return state.some.nested.data }
    }, {
      ADD_USER: mutations.add('some.nested.data')
    })
    watchForReactiveChange({ store, getterName: 'getUsers', onChange(value) {
      expect(value).to.deep.equal([
        { id: '2', name: 'John' },
      ])
      done()
    }})
    store.commit('ADD_USER', { id: '2', name: 'John' })
    expect(store.state.some.nested).to.deep.equal({
      data: [
        { id: '2', name: 'John' },
      ],
    })
  });
});

describe('add', () => {

  it('adds new element', (done) => {
    const store = newStore(defaultState, defaultGetters, {
      ADD_USER: mutations.add('users')
    })
    watchForReactiveChange({ store, onChange(value) {
      expect(value).to.deep.equal([
        { id: '3', name: 'Eva'   },
        { id: '2', name: 'John'  },
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike'  },
      ])
      done()
    }})
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

  it('adds new element at the beginning of array', (done) => {
    const store = newStore(defaultState, defaultGetters, {
      ADD_USER: mutations.add('users', { position: 'first' })
    })
    watchForReactiveChange({ store, onChange(value) {
      expect(value).to.deep.equal([
        { id: '2', name: 'John'  },
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike'  },
      ])
      done()
    }})
    store.commit('ADD_USER', { id: '2', name: 'John' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '2', name: 'John'  },
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike'  },
      ],
    })
  });

  it('adds new element at the beginning of array', (done) => {
    const store = newStore(defaultState, defaultGetters, {
      ADD_USER: mutations.add('users', { position: 'last' })
    })
    watchForReactiveChange({ store, onChange(value) {
      expect(value).to.deep.equal([
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike'  },
        { id: '2', name: 'John'  },
      ])
      done()
    }})
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
  it('updates element in array by id', (done) => {
    const store = newStore(defaultState, defaultGetters, {
      UPDATE_USER: mutations.update('users', { matchBy: 'id' })
    })
    watchForReactiveChange({ store, onChange(value) {
      expect(value).to.deep.equal([
        { id: '0', name: 'James'   },
        { id: '1', name: 'Newname' },
      ])
      done()
    }})
    store.commit('UPDATE_USER', { id: '1', name: 'Newname' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '0', name: 'James'   },
        { id: '1', name: 'Newname' },
      ],
    })
  });

  it('updates element in array by custom function', (done) => {
    const store = newStore(defaultState, defaultGetters, {
      UPDATE_USER: mutations.update('users', { matchBy: (a, b) => a.name === b.name })
    })
    watchForReactiveChange({ store, onChange(value) {
      expect(value).to.deep.equal([
        { id: '999', name: 'James' },
        { id: '1', name: 'Mike' },
      ])
      done()
    }})
    store.commit('UPDATE_USER', { id: '999', name: 'James' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '999', name: 'James' },
        { id: '1', name: 'Mike' },
      ],
    })
  });

  it('does not mutate state if element not found', () => {
    const store = newStore(defaultState, defaultGetters, {
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
  it('adds new element to array if not found', (done) => {
    const store = newStore(defaultState, defaultGetters, {
      UPDATE_USER: mutations.addOrUpdate('users', { matchBy: 'id', position: 'first' })
    })
    watchForReactiveChange({ store, onChange(value) {
      expect(value).to.deep.equal([
        { id: '999', name: 'Newname' },
        { id: '0', name: 'James' },
        { id: '1', name: 'Mike' },
      ])
      done()
    }})
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


describe('remove', () => {
  it('removes element from array by id', (done) => {
    const store = newStore(defaultState, defaultGetters, {
      REMOVE_USER: mutations.remove('users', { matchBy: 'id' })
    })
    watchForReactiveChange({ store, onChange(value) {
      expect(value).to.deep.equal([
        { id: '0', name: 'James' },
      ])
      done()
    }})
    store.commit('REMOVE_USER', { id: '1' })
    expect(store.state).to.deep.equal({
      users: [
        { id: '0', name: 'James' },
      ],
    })
  });

  it('does not mutate state if element not found', () => {
    const store = newStore(defaultState, defaultGetters, {
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
  it('sets value', (done) => {
    const store = newStore({
      ui: {
        focusedUserId: null,
      }
    }, {
      getFocusedUserId(state) { return state.ui.focusedUserId },
    }, {
      SET_FOCUSED_USER_ID: mutations.set('ui.focusedUserId'),
    })
    watchForReactiveChange({ store, getterName: 'getFocusedUserId', onChange(value) {
      expect(value).to.deep.equal(10)
      done()
    }})
    store.commit('SET_FOCUSED_USER_ID', 10)
    expect(store.state.ui.focusedUserId).to.equal(10)
  });
});
