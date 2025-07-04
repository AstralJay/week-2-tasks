const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) li.classList.add('completed');

    li.addEventListener('click', () => toggleTodo(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTodo(index);
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(text) {
  todos.push({ text, completed: false });
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
  }
});

renderTodos();
