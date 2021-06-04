// Define UI Vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

// Load all event listeners
function loadEventListeners() {
	// DOM Load Event so it shows still on the page when its refreshed from local storage.
	document.addEventListener('DOMContentLoaded', getTasks)
	// Add task event
	form.addEventListener('submit', addTask)
	// Remove Task
	taskList.addEventListener('click', removeTask)
	// Clear Task Event
	clearBtn.addEventListener('click', clearTask)
	// Filter Tasks Event
	filter.addEventListener('keyup', filterTasks)
}

// Get Tasks from Local Storage When DOM loads on refresh
function getTasks() {
	let tasks
	if (localStorage.getItem('tasks') === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.forEach(function (task) {
		// Create li element
		const li = document.createElement('li')
		// Add class
		li.className = 'collection-item'
		// Create text node and append to li
		li.appendChild(document.createTextNode(task))
		// Create new link element
		const link = document.createElement('a')
		// Add class
		link.className = 'delete-item secondary-content'
		// Add icon html
		link.innerHTML = '<i class="fa fa-remove"></i>'
		// Append the link to li
		li.appendChild(link)

		// Append li to ul
		taskList.appendChild(li)
	})
}

// Add Task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task')
	}

	// Create li element
	const li = document.createElement('li')
	// Add class
	li.className = 'collection-item'
	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value))
	// Create new link element
	const link = document.createElement('a')
	// Add class
	link.className = 'delete-item secondary-content'
	// Add icon html
	link.innerHTML = '<i class="fa fa-remove"></i>'
	// Append the link to li
	li.appendChild(link)

	// Append li to ul
	taskList.appendChild(li)

	// Store in local storage so it keeps its state even after refreshing.
	storeTaskInLocalStorage(taskInput.value)
	// Clear input
	taskInput.value = ''

	e.preventDefault()
}

// Store Task Function
function storeTaskInLocalStorage(task) {
	let tasks
	if (localStorage.getItem('tasks') === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.push(task)
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task Function

// ! the confirm is an built in function that makes the pop up so if user confirms then run the remove code
function removeTask(e) {
	// Want to target the parent of the x icon to make it work which is the a we need to write it like this
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			// We want to remove only the li not the icon which is the parent of the parent.
			e.target.parentElement.parentElement.remove()
			// Remove from Local Storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement)
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks
	if (localStorage.getItem('tasks') === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.forEach(function (task, index) {
		if (textItem.textContent === task) {
			tasks.splice(index, 1)
		}
	})
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear Task Function
function clearTask(e) {
	// taskList.innerHTML = ''
	// or the faster better way

	// ! while there is a first child or something there loop through and remove them
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild)
	}

	// Remove from local storage
	clearTasksFromLocalStorage()
}

// Remove from local storage
function clearTasksFromLocalStorage() {
	localStorage.clear()
}

// Filter Task function
function filterTasks(e) {
	const text = e.target.value.toLowerCase()
	document.querySelectorAll('.collection-item').forEach(function (task) {
		const item = task.firstChild.textContent
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block'
		} else {
			task.style.display = 'none'
		}
	})
}
