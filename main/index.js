/// ELEMENTOS DO DOM, localizando no html
const formulario = document.querySelector("#to-do-form");
const input01 = document.querySelector("#task-title-input");

const listaEstudos = document.querySelector("#lista-estudos");
const listaCasa = document.querySelector("#lista-casa");
const listaPessoal = document.querySelector("#lista-pessoal");
const listaProfissional = document.querySelector("#lista-profissional");

const categoria = document.querySelector("#select-input");

/// THEMES
function removeThemes() {
    document.body.classList.remove(
        "candy-blue",
        "candy-pink",
        "candy-green"
    );
}

document.querySelector("#theme-toggle-blue")
.addEventListener("click", () => {
    removeThemes();
    document.body.classList.add("candy-blue");
});

document.querySelector("#theme-toggle-pink")
.addEventListener("click", () => {
    removeThemes();
    document.body.classList.add("candy-pink");
});

document.querySelector("#theme-toggle-green")
.addEventListener("click", () => {
    removeThemes();
    document.body.classList.add("candy-green");
});

document.querySelector("#theme-toggle-main")
.addEventListener("click", () => {
    removeThemes();
    document.body.classList.add("main-theme");
});

/// STORAGE
let tasks = [];

const tarefasSalvas = localStorage.getItem("tasks");

if (tarefasSalvas) {
    tasks = JSON.parse(tarefasSalvas);
}

function salvarDados() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/// MAPA DE LISTAS
const listasCategorias = {
    Estudos: listaEstudos,
    Casa: listaCasa,
    Pessoal: listaPessoal,
    Profissional: listaProfissional,
};

/// RENDERIZAR TAREFA
function renderizarTask(task) {

    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = task.title;

    const categoriaSpan = document.createElement("small");
    categoriaSpan.textContent = task.categoria;

    /// estado inicial
    if (task.status === "done") {
        input.checked = true;
        span.style.textDecoration = "line-through";
    }

    /// TOGGLE CHECKBOX: comportamento
    input.addEventListener("change", (event) => {

        const done = event.target.checked;

        span.style.textDecoration = done ? "line-through" : "none";

        tasks = tasks.map((t) => {
            if (t.title === task.title) {
                return {
                    ...t,
                    status: done ? "done" : "doing",
                };
            }
            return t;
        });

        salvarDados();
    });

    /// REMOVER: comportamento
    const button = document.createElement("button");
    button.textContent = "Remover";

    button.addEventListener("click", () => {

        li.remove();

        tasks = tasks.filter(
            (t) => t.title !== task.title
        );

        salvarDados();
    });

    /// MONTAGEM
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);

    listasCategorias[task.categoria].appendChild(li);
}

/// CARREGAR TAREFAS SALVAS
tasks.forEach((task) => {
    renderizarTask(task);
});

/// ADICIONAR NOVA TAREFA
formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const taskTitle = input01.value;
    const categoriaValue = categoria.value;

    if (taskTitle.length <= 1) {
        alert("Sua tarefa precisa ter pelo menos 1 carácter!");
        return;
    }

    const novaTask = {
        title: taskTitle,
        status: "doing",
        categoria: categoriaValue,
    };

    tasks.push(novaTask);

    salvarDados();

    renderizarTask(novaTask);

    input01.value = "";
});
