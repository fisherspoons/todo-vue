<template>
  <Form
      @submit="onSubmit"
      :validation-schema="schema"
    >
      <TextInput
        name="title"
        type="text"
        label="Название"
        placeholder="Название списка дел"
      />
      <TextInput
        name="description"
        type="text"
        label="Описание"
        placeholder="Описание списка дел"
      />
      <button class="submit-btn" type="submit">Создать список</button>
    </Form>
</template>

<script>
import { Form } from "vee-validate";
import TextInput from "../UI/TextInput";
import * as Yup from "yup";
export default {
  name: "ToDoForm",
  components: {
    TextInput,
    Form,
  },
  data() {
    const schema = Yup.object().shape({
      title: Yup.string().required().trim(),
      description: Yup.string().required().trim(),
    });

    return {
      schema,
    };
  },
  methods: {
    onSubmit(values, { resetForm }) {
      const newTodo = {
        id: Date.now(),
        title: values.title.trim(),
        description: values.description.trim(),
        children: [],
      }
      this.$emit('create', newTodo)
      resetForm()
    }
  }
}
</script>

<style scoped lang="scss">
  @import './index.scss'
</style>