# vuex-mutations, by [InventiStudio](https://inventi.studio)

Factory of vuex mutations. DRY.

#### Table of Contents
- [Install](#install)
- [Example](#example)
- [API Documentation](#api)

## Install

```bash
# npm
npm i --save vuex-mutations
# or yarn
yarn add vuex-mutations
```

## Example

```javascript
import Mutations from 'vuex-mutations'

const state = {
  // Prepare state
  me: {
    login: '',
    email: '',
  },
  comments: [],
}

const mutations = {
  // Magic
  SET_USER:          Mutations.set('me'),
  UPDATE_USER_EMAIL: Mutations.set('me.email'),
  ADD_COMMENT:       Mutations.add('comments'),
  UPDATE_COMMENT:    Mutations.update('comments', { matchBy: 'comment_id' }),
  REMOVE_COMMENT:    Mutations.remove('comments', { matchBy: 'comment_id' }),
  ADD_FULL_COMMENT:  Mutations.addOrUpdate('comments', { matchBy: 'comment_id' })
}

const actions = {
  // Do your stuff here. Use mutations.
  SET_USER_ACTION({ commit }, user) {
    commit('SET_USER', user)
  }
  // (...)
}
```

## API

{{>main}}
