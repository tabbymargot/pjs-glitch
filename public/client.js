var todoList = {
  todos: [],
  displayTodos: function() {
    if (this.todos.length === 0) {
      console.log('Your todo list is empty');
    } else {
      console.log('My todos: ');
      for (i = 0; i < todoList.todos.length; i++) {
        if (this.todos[i].completed === true) {
          console.log('(x)', todoList.todos[i].todoText);
        } else {
          console.log('( )', todoList.todos[i].todoText);
        }
      }
    }
  },
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll: function() {
    var totalTodos = todoList.todos.length;
    var completedTodos = 0;
    
    //Get number of completed todos
    for (i = 0; i < totalTodos; i++)
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    
    //Case 1 - if everything's true, make everything false
    if(completedTodos === totalTodos) {
      for (i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } 
    //Case 2 - otherwise, make everything true
      else {
        for (i = 0; i < totalTodos; i++) {
          this.todos[i].completed = true;
        }
      }  
    this.displayTodos();
  }
};

var handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
  },
  changeTodo: function() {
    var changeTodoPosition = document.getElementById('changeTodoPosition'); //gets input
    var changeTodoText = document.getElementById('changeTodoText'); //gets input
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value); // passes the values only into the function and calls the function
    changeTodoPosition.value = '';
    changeTodoText.value = '';
  },
  deleteTodo: function() {
    var deleteTodoTextInput = document.getElementById('deleteTodoTextInput');
    todoList.deleteTodo(deleteTodoTextInput.valueAsNumber);
    deleteTodoTextInput.value = '';
  },
  toggleCompleted: function () {
    var toggleCompletedInput = document.getElementById('toggleCompletedInput');
    todoList.toggleCompleted(toggleCompletedInput.valueAsNumber);
    toggleCompletedInput.value = '';
  },
   toggleAll: function() {
    todoList.toggleAll();
  } 
};