document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
  
    loadTasks();

    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        taskInput.value = ''; 
      }
    });
  
    function addTask(taskText) {
      const task = {
        text: taskText,
        completed: false
      };

      const li = document.createElement('li');
      li.classList.add('task');
      li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <button class="remove-btn">X</button>`;
  
      li.addEventListener('click', () => toggleComplete(task, li));
  
      const removeBtn = li.querySelector('.remove-btn');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeTask(task, li);
      });
  
      taskList.appendChild(li);
  
      saveTaskToLocalStorage(task);
    }
  
    function toggleComplete(task, li) {
      task.completed = !task.completed;
      li.classList.toggle('completed', task.completed);
      updateLocalStorage();
    }
  
    function removeTask(task, li) {
      li.remove();
      removeTaskFromLocalStorage(task);
    }
  
    function saveTaskToLocalStorage(task) {
      const tasks = getTasksFromLocalStorage();
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(task) {
      let tasks = getTasksFromLocalStorage();
      tasks = tasks.filter(t => t.text !== task.text);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasksFromLocalStorage() {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    }
  
    function loadTasks() {
      const tasks = getTasksFromLocalStorage();
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task');
        if (task.completed) li.classList.add('completed');
        li.innerHTML = `
          <span class="task-text">${task.text}</span>
          <button class="remove-btn">X</button>
        `;
  
        li.addEventListener('click', () => toggleComplete(task, li));
  
        const removeBtn = li.querySelector('.remove-btn');
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          removeTask(task, li);
        });
  
        taskList.appendChild(li);
      });
    }
  
    function updateLocalStorage() {
      const tasks = [];
      document.querySelectorAll('.task').forEach(li => {
        const taskText = li.querySelector('.task-text').textContent;
        const completed = li.classList.contains('completed');
        tasks.push({ text: taskText, completed: completed });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  