const taskKey = '@tasks'

let selectedTaskId = null

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.id = `id-${taskId}`
  li.innerHTML = `
    <div>
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
    </div>
    <div class="botoes">
    <button title="Editar tarefa" onClick="openEditDialog(${taskId})" id="botaoEditar">✏️</button>
    <button title="Excluir Tarefa" onClick="excluir(${taskId})" id="botaoExcluir">❌</button>
</div>
  `

  taskList.appendChild(li)


  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

function excluir(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  selectedTaskId = tasks.findIndex((task) => task.id === taskId)
  tasks.splice(selectedTaskId, 1)
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  carregarTaskDaPagina()
}

function editTask(event) {
  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)
  event.preventDefault();
  const botaoEditar = document.getElementById('editarDados');

  const idTask = botaoEditar.className
  console.log(idTask)
  const tasks = JSON.parse(localStorage.getItem(taskKey))
  const editTitle = document.querySelector('#editTaskForm #title')
  const editDescription = document.querySelector('#editTaskForm #description')
  tasks[idTask].description = editDescription.value;
  tasks[idTask].title = editTitle.value;
  localStorage.setItem(taskKey, JSON.stringify(tasks))
  form.reset()
  const dialog = document.querySelector('dialog')

  carregarTaskDaPagina();
  dialog.close()

}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  selectedTaskId = tasks.findIndex((task) => task.id === taskId)
  const param = new URLSearchParams();
  const task = tasks[selectedTaskId]

  const dialog = document.querySelector('dialog')

  const editTitle = document.querySelector('#editTaskForm #title')
  const editDescription = document.querySelector('#editTaskForm #description')
  const botaoEditar = document.getElementById('editarDados');
  botaoEditar.className = selectedTaskId;
  editTitle.value = task.title
  editDescription.value = task.description

  dialog.showModal()
}

function closeDialog() {
  const dialog = document.querySelector('dialog')
  dialog.close()
}

// Carregar tarefas do localStorage ao recarregar a página
function carregarTaskDaPagina() {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')

  taskList.innerHTML = tasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div>
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
        <div class="botoes">

        <button title="Editar tarefa" onClick="openEditDialog(${task.id})" id="botaoEditar">✏️</button>
        <button title="Excluir Tarefa" onClick="excluir(${task.id})" id="botaoExcluir">❌</button>
</div>
      </li>
    `
    )
    .join('')
}
window.addEventListener('DOMContentLoaded', () => {
  carregarTaskDaPagina();

});
