//Specific purpose is to create array and change the data in the array
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
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
  }
};

//Specific purpose - handling user interactions. So when someone clicks on a button, there is a response, which is to run one of the methods in the object above, passing in data from the arguments submitted.
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPosition = document.getElementById('changeTodoPosition'); //gets input
    var changeTodoText = document.getElementById('changeTodoText'); //gets input
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value); // passes the values only into the function and calls the function
    changeTodoPosition.value = '';
    changeTodoText.value = '';
    view.displayTodos();
  },
  //'position' is passed in by setUpEventListeners method
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function () {
    var toggleCompletedInput = document.getElementById('toggleCompletedInput');
    todoList.toggleCompleted(toggleCompletedInput.valueAsNumber);
    toggleCompletedInput.value = '';
    view.displayTodos();
  },
   toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  } 
};

//Specific purpose - to show people what the todo list looks like.
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';
      
      if (todo.completed === true) {
          todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
          todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());//runs the createDeleteButton method below
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');//creates button
    deleteButton.textContent = 'Delete';//adds text
    deleteButton.className = 'deleteButton';//adds a class
    return deleteButton;
  },
  //this uses a process called 'event delegation' - see review video for version 10
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    
    todosUl.addEventListener('click', function(event) {
      
      //get the element that was clicked on
      var elementClicked = event.target;

      if (elementClicked.className === 'deleteButton') {
        //the argument below gets the id number of the delete button, which is a string. parseInt turns it into a number. 
        //it is then passed into handlers.deleteTodo.
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();//runs the code above