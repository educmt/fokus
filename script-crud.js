const addTarefaBtn = document.querySelector('.app__button--add-task');
const formAddTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const formCancelButton = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');


// Representa a lista de tarefas armazenadas no localStorage
let tarefasLista = JSON.parse(localStorage.getItem('tarefasLista')) || [];

// tarefaSelecionada e liTarefaSelecionada mantem um registro da tarefa atualmente selecionada.
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

// Cria novas tarefas e atualiza a descricao de tarefas existentes
function atualizarTarefas() {
    //localStorage so trabalha com string, para acessarmos seu conteúdo precisamos converter os objetos da lista de tarefas para string utilizando a API JSON
    localStorage.setItem('tarefasLista', JSON.stringify(tarefasLista));
}

function limparFormulario() {
    //Dessa forma o text area sempre é 'limpo', uma vez que salvamos uma tarefa(ou clicamos em cancelar), logo em seguida o formulario também é 'escondido'.
    textArea.value = '';
    formAddTarefa.classList.add('hidden');
};

//Constrói elemento HTML de lista <li> que compõe uma tarefa na lista de tarefas
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const p = document.createElement('p');
    p.classList.add('app__section-task-list-item-description');
    p.textContent = tarefa.descricao;

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('app_button-edit');


    btnEdit.onclick = () => {
        const novaDescricao = prompt('Digite o novo nome da tarefa que deseja editar.')
        if (novaDescricao) {
            p.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        };
    };

    const imgButton = document.createElement('img');
    imgButton.setAttribute('src', './imagens/edit.png');

    btnEdit.append(imgButton);

    li.append(svg);
    li.append(p);
    li.append(btnEdit);

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        btnEdit.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
            // Começa removendo a classe css que sinaliza uma tarefa selecionada
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })
            /* Aqui desselecionamos uma tarefa. 
            Caso a tarefa selecionada seja igual a tarefa atual, o texto de descricao será zerado,
            a tarefa receberar um valor null novamente e o return irá parar esse bloco de código*/
            if (tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = ''
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return
            }
            /* A cada primeiro click em uma tarefa, a tarefaSelecionada recebe o mesmo valor do objeto 'tarefa' passado
            como parametro */
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;

            li.classList.add('app__section-task-list-item-active');
        };
    };

    return li;
};

//Evento de click para que o formulario deixe de ser hidden e passe a ser exposto, o inverso também ocorre devido ao método toggle(alternancia)
addTarefaBtn.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden');
});
//Evento parar adicionar uma tarefa na lista de tarefas. O preventDefault para evitar o refresh da página ao clicarmos em 'salvar'. 
formAddTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefasLista.push(tarefa);

    //Cria e mostra a tarefa no momento em que ela é submetida.
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);

    atualizarTarefas();

    limparFormulario();
})

//Evento para cancelar o preechimento de uma nova tarefa ao clicar no botão 'Cancelar'
formCancelButton.addEventListener('click', limparFormulario)


// Disparando evento customizado criado no arquivo script.js
// Remove a seleção da tarefa e adiciona cor verde sinalizando a finalização de uma tarefa
document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true;
        atualizarTarefas();
    };
});

//Remove tarefas concluidas ou todas recebendo um parametro booleano(true/false)
const removerTarefas = (somenteCompletas) => {
    //Condicional ternaria verifica qual seletor será buscado para fazer a remoção da lista de tarefas concluídas ou todas.
    const tarefas = somenteCompletas ?
        '.app__section-task-list-item-complete' : '.app__section-task-list-item'
    
    document.querySelectorAll(tarefas).forEach(tarefa => {
        paragrafoDescricaoTarefa.textContent = '';
        tarefa.remove();
    })
    // Atualiza o localStorage com uma lista so com tarefas incompletas, caso tenha removido somente as completas ou atualiza com uma lista vazia, caso tenha removido todas as tarefas
    tarefasLista = somenteCompletas ? tarefasLista.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas();
};
// Botões de remoção de tarefas para acionar a função removerTarefas() recebendo parametros booleanos.
btnRemoverConcluidas.onclick = () => removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);



//Esse forEach faz com que a lista de tarefas seja carregada assim que o DOM é carregado no navegador
document.addEventListener('DOMContentLoaded', () => {
    tarefasLista.forEach(tarefa => {
        const elementoTarefa = criarElementoTarefa(tarefa);
        ulTarefas.append(elementoTarefa);
    });
});