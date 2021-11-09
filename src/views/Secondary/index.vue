<template>
  <div class="secondary-page">
    <custom-button @click="$router.back()">
      &#8592; Назад
    </custom-button>
    <h1 class="secondary-page__info">Список дел : {{ $route.query.title }}</h1>
    <Form
      class="secondary-page__form"
      @submit="onSubmit"
      :validation-schema="schema"
    >
      <TextInput
        name="title"
        type="text"
        label="Название"
        placeholder="Название дела"
      />
      <button class="submit-btn" type="submit">Добавить дело</button>
    </Form>
    
    <div class="secondary-page__child-wrapper" v-if="filtredChild.length > 0">
        <custom-select
          :options="sortOptions"
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
        />
        <child-item 
          v-for="child in filtredChild" 
          :key="child.id" 
          :child="child"
          @block-child="handleBlock"
          @edit-child="handleEdit"
          @remove-child="handleDelete"
        /> 
    </div>
    <h2 v-else class="secondary-page__no-child">
      Список пуст
    </h2>
  </div>
</template>

<script>

import * as Yup from "yup";
import {mapState, mapGetters, mapMutations} from 'vuex';
import ChildItem from '../../components/ChildItem';
import TextInput from "../../components/UI/TextInput";
import { Form } from "vee-validate";
export default {
  components: { ChildItem, TextInput, Form },
  data() {
    const schema = Yup.object().shape({
      title: Yup.string().required().trim(),
    });
    return {
      schema,
    }
  },
  methods: {
    ...mapMutations({
      setCurrentTodoId: 'todo/setCurrentTodoId',
      addChild: 'todo/addChild',
      toggleEditableChild: 'todo/toggleEditableChild',
      editChild: 'todo/editChild',
      deleteChild: 'todo/deleteChild',
      setSelectedSort: 'todo/setSelectedSort',
    }),
    onSubmit(values, { resetForm }) {
      const newWork = {
        id: Date.now(),
        title: values.title.trim(),
        isEditable: true,
      }
      this.addChild({newWork, id: +this.$route.params.id})
      resetForm()
    },
    handleBlock(id) {
      this.toggleEditableChild({childId: id, todoId: +this.$route.params.id})
    },
    handleEdit(child) {
      const { id, title } = child;
      this.editChild({ id, title, todoId: +this.$route.params.id})
    },
    handleDelete(child) {
      if(child.isEditable) {
        this.deleteChild({childId: child.id, todoId: +this.$route.params.id})
      }
    },
    
  },
  computed: {
    ...mapState({
      todos: state => state.todo.todos,
      sortOptions: state => state.todo.sortOptions,
      selectedSort: state => state.todo.selectedSort,

    }),
    ...mapGetters({
      filtredChild: 'todo/filtredChild'
    }),
  },
  mounted() {   
    this.setCurrentTodoId(+this.$route.params.id) 
  }
}
</script>

<style scoped lang='scss'>
  @import './index.scss'
</style>