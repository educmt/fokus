//botoes
const focoBt = document.querySelector('.app__card-button--foco')
const descansoCurtoBt = document.querySelector('.app__card-button--curto')
const descansoLongoBt = document.querySelector('.app__card-button--longo')
const iniciarPausarBt = document.querySelector('#start-pause')
const iniciarPausarBtImg = document.querySelector('#start-pause img')
const iniciarPausarBtText = document.querySelector('#start-pause span')
const botoes = document.querySelectorAll('.app__card-button')

//Elementos manipulados por eventos através dos botoes
const html = document.querySelector('html')
const tempoNaTela = document.querySelector('#timer')
const imgApp = document.querySelector('.app__image')
const appTitulo = document.querySelector('.app__title')

//Variaveis relacionadas aos temporizadores
let tempoDecorridoEmSegs = 1500;
let intervaloId = null;
let ciclosDeFoco = 0;

//sons
const musicaInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true
const somIniciar = new Audio('/sons/play.wav')
const somPausar = new Audio('/sons/pause.mp3')
const somFinalizar = new Audio('/sons/beep.mp3')

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegs = 1500;
    alteraContexto('foco')
    focoBt.classList.add('active')
})
descansoCurtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegs = 300;
    alteraContexto('descanso-curto')
    descansoCurtoBt.classList.add('active')
})
descansoLongoBt.addEventListener('click', () => {
    tempoDecorridoEmSegs = 900;
    alteraContexto('descanso-longo')
    descansoLongoBt.classList.add('active')
})

function alteraContexto(contexto) {
    mostrarTempo()
    
    botoes.forEach(contexto => contexto.classList.remove('active'))
    
    html.setAttribute('data-contexto', contexto)
    imgApp.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            appTitulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            zerarTemp()
            break;
        case 'descanso-curto':
            appTitulo.innerHTML = `Que tal uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
            zerarTemp()
            break;
        case 'descanso-longo':
            appTitulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            zerarTemp()
            break;   
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegs <= 0){
        somFinalizar.play()
        
        // Após 4 ciclos de foco o programa direciona para um descanso longo
        const contextoAtual = html.getAttribute('data-contexto')

        if (contextoAtual === 'foco') {

            ciclosDeFoco++

            if (ciclosDeFoco % 4 === 0) {
                tempoDecorridoEmSegs = 900
                alteraContexto('descanso-longo')
                descansoLongoBt.classList.add('active')
            } else {
                tempoDecorridoEmSegs = 300
                alteraContexto('descanso-curto')
                descansoCurtoBt.classList.add('active')
            }

        } else {
            tempoDecorridoEmSegs = 1500
            alteraContexto('foco')
            focoBt.classList.add('active')
        }
        
        mostrarTempo()
        zerarTemp()
        return
    }
    tempoDecorridoEmSegs -= 1;
    mostrarTempo();
}

function iniciarOuPausar(){
    iniciarPausarBtImg.src = '/imagens/pause.png'
    iniciarPausarBtText.textContent = 'Pausar'
    if(intervaloId){
        somPausar.play()
        zerarTemp()
        return
    }
    somIniciar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerarTemp(){
    clearInterval(intervaloId)
    iniciarPausarBtImg.src = '/imagens/play_arrow.png'
    iniciarPausarBtText.textContent = 'Começar'
    intervaloId = null;
}

iniciarPausarBt.addEventListener('click', iniciarOuPausar)

function mostrarTempo(){
    // Date recebe milissegundos como parametro, por isso multiplicamos por mil.
    const tempo = new Date(tempoDecorridoEmSegs * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`

}

mostrarTempo()