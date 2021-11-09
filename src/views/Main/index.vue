<template>
  <div class="main-page">
    <to-do-form @create="createTodoHandler"/>
    <ul v-if="todos.length > 0" class="todo-list">
      <to-do-item
        v-for="todo in todos"
        :todo="todo"
        :key="todo.id"
        @edit="editHandler"
        @remove="removeTodoHandler"
      />
    </ul>
    <h2 v-else class="todo-list-info">
      Список  пуст
    </h2>
  </div>
</template>

<script>
import ToDoForm from '../../components/ToDoForm'
import ToDoItem from '../../components/ToDoItem'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  components: { ToDoForm, ToDoItem },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations({ 
      createTodo: 'todo/createTodo',
      deleteTodo: 'todo/deleteTodo',
      editTodo: 'todo/editTodo',
    }),
    ...mapActions({
      
    }),
    createTodoHandler(todo) {
      this.createTodo({ ...todo })

    },
    removeTodoHandler(todo) {
      this.deleteTodo({...todo})
    },
    editHandler(todo) {
      this.editTodo({...todo})
    },
    
  },
  computed: {
    ...mapState({
      todos: state => state.todo.todos,
      
    }),
    ...mapGetters({
      sortedtodos: 'todo/sortedtodos',
    })
  },

}
</script>

<style lang="scss" scoped>
  @import './index.scss'
</style>

