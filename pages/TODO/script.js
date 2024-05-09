function adicionarAoLocalStorage(event) {
  event.preventDefault();
  let textTask = document.getElementById("textTask").value;
  let titleTask = document.getElementById("titleTask").value;
  let arrayTask = {
    texto: [textTask],
    titulo: [titleTask],
  };

  if (!localStorage.getItem("todo")) {
    localStorage.setItem("todo", JSON.stringify(arrayTask));
  } else {
    let taskToJson = JSON.parse(localStorage.getItem("todo"));
    taskToJson.titulo.push(titleTask);
    taskToJson.texto.push(textTask);
    localStorage.setItem("todo", JSON.stringify(taskToJson));
    listarTarefas(taskToJson);
  }
}

function listarTarefas(lista) {
  let div = document.getElementById("listaDeTarefas");
  div.innerHTML = ""; // Clear previous content
  for (let i = 0; i < lista.titulo.length; i++) {
    let divTask = document.createElement("div");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    h1.textContent = lista.titulo[i];
    p.textContent = lista.texto[i];
    h1.id = "textoTarefa";
    divTask.appendChild(h1);
    divTask.appendChild(p);
    div.appendChild(divTask);
    div.className ='listandoTarefas'
  }
}
