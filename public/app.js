// API Base URL
const API_BASE = '/api/todos';

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todosList = document.getElementById('todos-list');
const emptyState = document.getElementById('empty-state');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');
const remainingCount = document.getElementById('remaining-count');

// State
let todos = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    todoForm.addEventListener('submit', handleAddTodo);
}

// Fetch all todos
async function fetchTodos() {
    try {
        showLoading();
        hideError();

        const response = await fetch(API_BASE);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch todos');
        }

        todos = data.data || [];
        renderTodos();
        updateStats();

    } catch (error) {
        showError(error.message);
        console.error('Fetch error:', error);
    } finally {
        hideLoading();
    }
}

// Add new todo
async function handleAddTodo(e) {
    e.preventDefault();

    const title = todoInput.value.trim();
    if (!title) return;

    try {
        hideError();

        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create todo');
        }

        // Clear input
        todoInput.value = '';

        // Refresh todos
        await fetchTodos();

    } catch (error) {
        showError(error.message);
        console.error('Add todo error:', error);
    }
}

// Toggle todo completed status
async function toggleTodo(id) {
    try {
        hideError();

        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'PATCH'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update todo');
        }

        // Refresh todos
        await fetchTodos();

    } catch (error) {
        showError(error.message);
        console.error('Toggle todo error:', error);
    }
}

// Delete todo
async function deleteTodo(id) {
    if (!confirm('Opravdu chceš smazat tento úkol?')) {
        return;
    }

    try {
        hideError();

        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete todo');
        }

        // Refresh todos
        await fetchTodos();

    } catch (error) {
        showError(error.message);
        console.error('Delete todo error:', error);
    }
}

// Render todos to DOM
function renderTodos() {
    todosList.innerHTML = '';

    if (todos.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    todos.forEach(todo => {
        const li = createTodoElement(todo);
        todosList.appendChild(li);
    });
}

// Create todo element
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group';

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.className = 'w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer';
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    // Title
    const title = document.createElement('span');
    title.className = `flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`;
    title.textContent = todo.title;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
    `;
    deleteBtn.className = 'text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(deleteBtn);

    return li;
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const remaining = total - completed;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    remainingCount.textContent = remaining;
}

// Show loading state
function showLoading() {
    loading.classList.remove('hidden');
    todosList.classList.add('hidden');
    emptyState.classList.add('hidden');
}

// Hide loading state
function hideLoading() {
    loading.classList.add('hidden');
    todosList.classList.remove('hidden');
}

// Show error
function showError(message) {
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

// Hide error
function hideError() {
    errorDiv.classList.add('hidden');
}
