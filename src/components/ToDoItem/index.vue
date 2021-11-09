<template>
  <div class="todo">
    <div>
      <div>
        <strong >Название: </strong>
        <strong v-if="!isEditing">{{ todo.title }}</strong>
        <input 
          type="text" 
          v-else
          v-model="newTitle"
          @blur="finishEditing()"
          v-on:keyup.enter="finishEditing"

        > 
      </div>
      <div>
        <strong>Описание: </strong>
        <strong v-if="!isEditing">{{ todo.description }}</strong> 
        <input 
          type="text" 
          v-else
          v-model="newDescription"
          @blur="finishEditing()"
          v-on:keyup.enter="finishEditing" 
        > 
      </div>
    </div>
    <div class="todo__btns">
      <custom-button
        class="todo__btn"
        @click="startEditing()"
      >
        <i class="fas fa-edit"></i>
      </custom-button>
      <custom-button
        class="todo__btn"
        @click="$router.push({
          path: `/Secondary/${todo.id}`,
          query: { title: `${todo.title}`}
        })"
      >
        <i class="fas fa-folder-open"></i>
      </custom-button>
      <custom-button
        class="todo__btn"
        @click="$emit('remove',todo)"
      >
        <i class="fas fa-trash-alt"></i>
      </custom-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      newTitle: '',
      newDescription: ''
    }
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    startEditing() {
      if (this.isEditing) {
        this.finishEditing();
      } else {
        this.newTitle = this.todo.title;
        this.newDescription = this.todo.description;
        this.isEditing = true;
        // this.$nextTick(() => this.$refs.newDescRef.focus());
      }
    },
    finishEditing() {
      this.isEditing = false;
      this.$emit("edit", {id: this.todo.id, title: this.newTitle, description: this.newDescription});
    }
  }
}
</script>

<style scoped lang="scss">
    @import './index.scss'
</style>