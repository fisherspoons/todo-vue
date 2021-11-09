export const todoModule = {
    state () {
        return {
            todos: [
                {id: 1111, title: 'Дом', description: 'Инструменты', children: [
                    {id: 1, title: 'Дрель', isEditable: true},
                    {id: 2, title: 'Сковорода', isEditable: false},
                    {id: 3, title: 'Ковёр', isEditable: true},
                ]},
                {id: 2222, title: 'Работа', description: 'Задачи', children: [
                    {id: 1, title: 'Выучить Vue', isEditable: true},
                    {id: 2, title: 'Найти работу', isEditable: true},
                    {id: 3, title: 'Страть про', isEditable: true},
                ]},
                {id: 3333, title: 'Семья', description: 'Покупки', children: [
                    {id: 1, title: 'Таблетки', isEditable: true},
                    {id: 2, title: 'Яйца', isEditable: true},
                    {id: 3, title: 'Колбаса', isEditable: true},
                ]},
                {id: 4444, title: 'Отпуск', description: 'Города для посещения', children: [
                    {id: 1, title: 'Львов', isEditable: true},
                    {id: 2, title: 'Рим', isEditable: true},
                    {id: 3, title: 'Доломиты', isEditable: true},
                ]
                },
            ],
            selectedSort: '',
            currentTodoId: null,
            sortOptions: [
                {value: 'incr', name: 'По возрастанию (от А до Я)'},
                {value: 'decr', name: 'По убыванию (от Я до А)'},
            ],
        }
    },
    getters: {
        filtredChild: (state) => {
            return state.todos.filter(post => post.id === state.currentTodoId).map(item => item.children).flat();
        },
        
    },
    mutations: {
        setCurrentTodoId(state, currentTodoId) {
            state.currentTodoId = currentTodoId
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
            state.todos = state.todos.map(item => item.id === state.currentTodoId ? ({
                ...item,
                children: item.children.sort((a, b) => {
                  let left = a.title.toLowerCase();
                  let right = b.title.toLowerCase();
                  if (selectedSort === 'incr') {
                      return (left === right) ? 0 : left > right ? 1 : -1;
            
                  } else if(selectedSort === 'decr') {
                    return (left === right) ? 0 : left < right ? 1 : -1;
                  }
                  
                })
              }) : item)
        },
        createTodo(state, todo) {
            state.todos.push(todo)
        },
        deleteTodo(state, todo) {
            state.todos = state.todos.filter((val) => val.id !== todo.id);
        },
        editTodo(state, todo) {
            let existingTodo = state.todos.find((item) => item.id === todo.id);
            if (existingTodo) {
                existingTodo.title = todo.title;
                existingTodo.description = todo.description;
            }
        },

        addChild(state, newWork) {
            let existingTodo = state.todos.find((item) => item.id === newWork.id);
            if (existingTodo) {
                existingTodo.children.push(newWork.newWork)
            }
        },
        toggleEditableChild(state, ids) {
            let existingTodo = state.todos.find((item) => item.id === ids.todoId);
            let existingChild = existingTodo.children.find((child) => child.id === ids.childId)
            if(existingChild) {
                existingChild.isEditable = !existingChild.isEditable
            }
        },
        editChild(state, child) {
            let existingTodo = state.todos.find((item) => item.id === child.todoId);
            let existingChild = existingTodo.children.find((item) => item.id === child.id)
            if (existingChild) {
                existingChild.title = child.title;
            }
        },
        deleteChild(state, ids) {
            state.todos = state.todos.map(
                item => 
                    item.id === ids.todoId
                        ? ({
                            ...item,
                            children: item.children.filter(
                                        child => 
                                            child.id !== ids.childId
                            )
                        }) 
                        : item
            )
        },  
    },
    actions: {
       
    },
    namespaced: true
}