document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('task-count');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const updateCount = () => {
        const pending = todos.filter(t => !t.completed).length;
        taskCount.textContent = `${pending} tarea${pending !== 1 ? 's' : ''} pendiente${pending !== 1 ? 's' : ''}`;
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'pending') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true;
        });

        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            if (todo.completed) li.classList.add('completed');

            li.innerHTML = `
                <span class="todo-text" onclick="toggleTodo(${index})">${todo.text}</span>
                <button class="delete-btn" onclick="deleteTodo(${index})">Eliminar</button>
            `;
            todoList.appendChild(li);
        });
        updateCount();
    };

    window.toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    addBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            input.value = '';
            saveTodos();
            renderTodos();
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addBtn.click();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });

    renderTodos();
});
