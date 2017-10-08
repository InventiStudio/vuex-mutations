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

<a name="module_Mutations"></a>

## Mutations
Collection of functions that creates mutations


* [Mutations](#module_Mutations)
    * [.add(path, options)](#module_Mutations.add) ⇒ <code>Mutation(state, element)</code>
    * [.update(path, options)](#module_Mutations.update) ⇒ <code>Mutation(state, element)</code>
    * [.addOrUpdate(path, options)](#module_Mutations.addOrUpdate) ⇒ <code>Mutation(state, element)</code>
    * [.remove(path, options)](#module_Mutations.remove) ⇒ <code>Mutation(state, element)</code>
    * [.set(path)](#module_Mutations.set) ⇒ <code>Mutation(state, element)</code>

<a name="module_Mutations.add"></a>

### Mutations.add(path, options) ⇒ <code>Mutation(state, element)</code>
It creates mutation that adds element to array

**Kind**: static method of [<code>Mutations</code>](#module_Mutations)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | Path to array |
| options | <code>Object</code> |  |  |
| [options.position] | <code>String</code> | <code>&#x27;first&#x27;</code> | Determine if element should be inserted at the beginning ('first') or end ('last') |

**Example**  
```js
const mutations = {
  ADD_USER:        add('users'),
  ADD_USER_AT_END: add('users', { position: 'last' }),
}
```
<a name="module_Mutations.update"></a>

### Mutations.update(path, options) ⇒ <code>Mutation(state, element)</code>
It creates mutation that update element of array. It does nothing if not found

**Kind**: static method of [<code>Mutations</code>](#module_Mutations)  

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
<a name="module_Mutations.addOrUpdate"></a>

### Mutations.addOrUpdate(path, options) ⇒ <code>Mutation(state, element)</code>
It creates mutation that update element of array if found. It adds it if not.

**Kind**: static method of [<code>Mutations</code>](#module_Mutations)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | Path to array |
| options | <code>Object</code> |  |  |
| [options.position] | <code>String</code> | <code>&#x27;first&#x27;</code> | Determine if element should be inserted at the beginning ('first') or end ('last') |
| [options.matchBy] | <code>function</code> \| <code>String</code> | <code>(a, b) =&gt; a === b</code> | It can by function or propery name |

**Example**  
```js
const mutations = {
  UPDATE_OR_ADD_BY_REFERENCE:   addOrUpdate('path.to.array'),
  UPDATE_OR_ADD_BY_ID:          addOrUpdate('path.to.array', { matchBy: 'data.id', position: 'last' }),
  UPDATE_OR_ADD_BY_CUSTOM_FUNC: addOrUpdate('path.to.array', { matchBy(a, b) { return a.name === b.name } }),
}
```
<a name="module_Mutations.remove"></a>

### Mutations.remove(path, options) ⇒ <code>Mutation(state, element)</code>
It creates mutation that remove element from array. It does nothing if not found

**Kind**: static method of [<code>Mutations</code>](#module_Mutations)  

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
<a name="module_Mutations.set"></a>

### Mutations.set(path) ⇒ <code>Mutation(state, element)</code>
It creates mutation that set object property.

**Kind**: static method of [<code>Mutations</code>](#module_Mutations)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path to property |

**Example**  
```js
const mutations = {
  SET_SOMETHING: set('path.to.prop'),
}
```
