import { createStore } from 'vuex'
import { todoModule } from './todoModule'
import createPersistedState from "vuex-persistedstate";

const dataState = createPersistedState({
    key: 'todos',
    paths: ['todo.todos']
  })

export default createStore(
    {
        modules: {
            todo: todoModule
        },
        plugins: [dataState]
    }
) 