// SELECIONANDO ELEMENTOS
    //procura e seleciona elementos na HTML com id(#) ou a class(.) informado dentro dos parênteses
    const todoForm = document.querySelector("#todo-form");
    const todoInput = document.querySelector("#todo-input");
    const todoList = document.querySelector("#todo-list");
    const editForm = document.querySelector("#edit-form");
    const editInput = document.querySelector("#edit-input");
    const cancelEdition = document.querySelector("#cancel-edit-btn");
    const itens = JSON.parse(localStorage.getItem("itens")) || [] 

    let oldInputValue;

// FUNÇÕES
    //document.createElement permite a criação de elementos na página HTML de forma dinâmica
    const saveTodo = (text) => {
        const todo = document.createElement("div");
        //o método .add permite a criação de classes ou ID's, com seu nome dado dentro do parênteses
        todo.classList.add("todo");
        
        const todoTitle = document.createElement("h3");
        todoTitle.innerText = text;
        todo.appendChild(todoTitle);

        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-todo");
        doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
        todo.appendChild(doneBtn)

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-todo");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
        todo.appendChild(editBtn)

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-todo");
        removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        todo.appendChild(removeBtn)

        todoList.appendChild(todo)

        //o método .appendChild() insere no HTML todos os elementos criados pelo método .createElement()
        
        todoInput.value = "" //esvazia o campo do input a cada vez que um novo elemento é inserido na página
        todoInput.focus() //pré-seleciona o input após a adição do elemento na página
    }
    const toggleForms = () =>{
        editForm.classList.toggle("hide");
        todoForm.classList.toggle("hide");
        todoList.classList.toggle("hide");
    }

    const updateTodo = (text) => {
        
        const allTodo = document.querySelectorAll(".todo")

        //Para cada classe todo, se o texto de todoTitle for IGUAL ao valor anterior, ele irá receber o novo texto
        allTodo.forEach((todo) =>{
            let todoTitle = todo.querySelector("h3")

            if (todoTitle.innerText === oldInputValue){
                todoTitle.innerText = text
            }
        })
    }

// EVENTOS
    //addEventListener permite que uma função seja executada sempre que um evento ocorre na página, esse evento é descrito no primeiro 
    //parâmetro do método, entre aspas ""
    // variavel.addEventListener(event, function, useCapture)
    //() => são as chamadas "arrow functions" ou funções anônimas (sem nome)
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault() //faz com que o formulário não seja enviado ao pressionar o botão;

    //seleciona o input e "captura" o dado que está dentro dele, através do atributo value
    const inputValue = todoInput.value;
    if(inputValue) {
        saveTodo(inputValue)
    }
    const taskAtual = {
        "tarefa" : inputValue.value
    }
    localStorage.setItem("itens", JSON.stringify(itens))
})
//mapeia TODA a pagina HTMl atrás do evento de "clique"
document.addEventListener("click", (e) =>{

    //após localizado o elemento, ele é armazenado na variável targetEl
    const targetEl = e.target;
    //busca e seleciona o elemento pai mais próximo
    const parentEl = targetEl.closest("div");
    //checa se o elemento contém a class ou ID informado no parênteses
    let todoTitle;

    //verifica a existencia de um elemento pai e armazena o seu título na variável (conteúdo da tag H)
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        //
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove(); //remove um elemento HTML criado dinâmicamente
    }
});

cancelEdition.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
})
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const editInputValue = editInput.value;

    if (editInputValue){
        updateTodo(editInputValue);
    }
    toggleForms();
})