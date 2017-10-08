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

<a name="module_mutations"></a>

## mutations
Collection of functions that creates mutations


* [mutations](#module_mutations)
    * [.add(path, options)](#module_mutations.add) ⇒ <code>Mutation(state, element)</code>
    * [.update(path, options)](#module_mutations.update) ⇒ <code>Mutation(state, element)</code>
    * [.addOrUpdate(path, options)](#module_mutations.addOrUpdate) ⇒ <code>Mutation(state, element)</code>
    * [.remove(path, options)](#module_mutations.remove) ⇒ <code>Mutation(state, element)</code>
    * [.set(path)](#module_mutations.set) ⇒ <code>Mutation(state, element)</code>

<a name="module_mutations.add"></a>

### mutations.add(path, options) ⇒ <code>Mutation(state, element)</code>
It creates mutation that adds element to array

**Kind**: static method of [<code>mutations</code>](#module_mutations)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | Path to array |
| options | <code>Object</code> |  |  |
| [options.position] | <code>String</code> | <code>&#x27;first&#x27;</code> | Determine if element should be inserted at the beginning ('first') or end ('last') |

**Example**  
```js
const mutations = {
  ADD_USER:        update('users'),
  ADD_USER_AT_END: update('users', { position: 'last' }),
}
```
<a name="module_mutations.update"></a>

### mutations.update(path, options) ⇒ <code>Mutation(state, element)</code>
It creates mutation that update element of array. It does nothing if not found

**Kind**: static method of [<code>mutations</code>](#module_mutations)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | Path to array |
| options | <code>Object</code> |  |  |
| [options.matchBy] | <code>function</code> \| <code>String</code> | <code>(a, b) =&gt; a === b</code> | It can by function or propery name |

**Example**  
```js
const mutations = {
  UPDATE_BY_REFERENCE:   update('path.to.array'),
  UPDATE_BY_ID:          update('path.to.array', { matchBy: 'id' }),
  UPDATE_BY_CUSTOM_FUNC: update('path.to.array', { matchBy(a, b) { return a.name === b.name } }),
}
```
<a name="module_mutations.addOrUpdate"></a>

### mutations.addOrUpdate(path, options) ⇒ <code>Mutation(state, element)</code>
It creates mutation that update element of array if found. It adds it if not.

**Kind**: static method of [<code>mutations</code>](#module_mutations)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | Path to array |
| options | <code>Object</code> |  |  |
| [options.position] | <code>String</code> | <code>&#x27;first&#x27;</code> | Determine if element should be inserted at the beginning ('first') or end ('last') |
| [options.matchBy] | <code>function</code> \| <code>String</code> | <code>(a, b) =&gt; a === b</code> | It can by function or propery name |

**Example**  
```js
const mutations = {
  UPDATE_OR_ADD_BY_REFERENCE:   update('path.to.array'),
  UPDATE_OR_ADD_BY_ID:          update('path.to.array', { matchBy: 'data.id', position: 'last' }),
  UPDATE_OR_ADD_BY_CUSTOM_FUNC: update('path.to.array', { matchBy(a, b) { return a.name === b.name } }),
}
```
<a name="module_mutations.remove"></a>

### mutations.remove(path, options) ⇒ <code>Mutation(state, element)</code>
It creates mutation that remove element from array. It does nothing if not found

**Kind**: static method of [<code>mutations</code>](#module_mutations)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | Path to array |
| options | <code>Object</code> |  |  |
| [options.matchBy] | <code>function</code> \| <code>String</code> | <code>(a, b) =&gt; a === b</code> | It can by function or propery name |

**Example**  
```js
const mutations = {
  REMOVE_BY_REFERENCE:   remove('path.to.array'),
  REMOVE_BY_ID:          remove('path.to.array', { matchBy: 'id' }),
  REMOVE_BY_CUSTOM_FUNC: remove('path.to.array', { matchBy(a, b) { return a.name === b.name } }),
}
```
<a name="module_mutations.set"></a>

### mutations.set(path) ⇒ <code>Mutation(state, element)</code>
It creates mutation that set object property.

**Kind**: static method of [<code>mutations</code>](#module_mutations)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path to property |

**Example**  
```js
const mutations = {
  SET_SOMETHING: set('path.to.prop'),
}
```
