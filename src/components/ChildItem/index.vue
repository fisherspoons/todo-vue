<template>
  <div class="child">
      <div>
        <strong >Название: </strong>
        <strong v-if="!isEditing">{{ child.title }}</strong>
        <input 
          type="text" 
          v-else
          v-model="newTitle"
          @blur="finishEditing()"
          ref="newChild"
          v-on:keyup.enter="finishEditing"
        > 
      </div>
      <div class="child__btns">
        <custom-button 
          class="child__btn"
          :class="{'child__btn_isEditable': child.isEditable, 'child__btn_notEditable': !child.isEditable}"
          @click="$emit('block-child',child.id)"
        > 
          {{child.isEditable ? 'Разблокирован': 'Заблокирован'}}
        </custom-button>
        <custom-button 
          class="child__btn" 
          @click="startEditing(child.isEditable)"
        >
          <i class="fas fa-edit"></i>
        </custom-button>
        <custom-button 
          class="child__btn" 
          @click="$emit('remove-child',child)"
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
      newTitle: ''
    }
  },
  props: {
    child: {
      type: Object,
      required: true
    }
  },
  methods: {
    startEditing(editStatus) {
      if (editStatus) {
        this.newTitle = this.child.title;
        this.isEditing = true;
        this.$nextTick(() => this.$refs.newChild.focus());
      } 
    },
    finishEditing() {
      this.isEditing = false;
      this.$emit("edit-child", {id: this.child.id, title: this.newTitle});
    }
  }

}
</script>

<style lang="scss" scoped>
    @import './index.scss'
</style>