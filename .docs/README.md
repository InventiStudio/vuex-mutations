# vuex-mutations

Factory of vuex mutations

## Example

```javascript
import mutations from 'vuex-mutations'

const state = {
  me: {
    login: '',
    email: '',
  },
  comments: [],
}

const mutations = {
  SET_USER:          mutations.set('me'),
  UPDATE_USER_EMAIL: mutations.set('me.email'),
  ADD_COMMENT:       mutations.add('comments'),
  UPDATE_COMMENT:    mutations.update('comments', { matchBy: 'comment_id' }),
  REMOVE_COMMENT:    mutations.remove('comments', { matchBy: 'comment_id' }),
  ADD_FULL_COMMENT:  mutations.addOrUpdate('comments', { matchBy: 'comment_id' })
}
```

## API

{{>main}}
