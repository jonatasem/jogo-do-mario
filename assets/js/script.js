const mario = document.getElementById('mario');
const pipe = document.getElementById('pipe');
const pontuacao = document.getElementById('pontuacao-final');
const mobile = document.getElementById('btn-pular-mobile');
const board = document.getElementById('board');
const header = document.getElementById('header');

// Variáveis de controle
let stateMario = false;
let constadorFinal = 0;
let pipePassed = false;

// Função para atualizar a pontuação e o estilo do fundo
const atualizarPontuacao = () => {
    pontuacao.innerText = constadorFinal;

    const styles = [
        { score: 10, boardColor: 'linear-gradient(to bottom, #050035, white)', headerColor: 'linear-gradient(to bottom, black, #050035)' },
        { score: 20, boardColor: 'linear-gradient(to bottom, #00a2ff, #ffffff)', headerColor: 'linear-gradient(to bottom, #00a2ff, #00a2ffa6)' },
        { score: 30, boardColor: 'linear-gradient(to bottom, #050035, white)', headerColor: 'linear-gradient(to bottom, black, #050035)' },
        { score: 40, boardColor: 'linear-gradient(to bottom, #00a2ff, #ffffff)', headerColor: 'linear-gradient(to bottom, #00a2ff, #00a2ffa6)' }
    ];

    styles.forEach(style => {
        if (constadorFinal === style.score) {
            board.style.backgroundImage = style.boardColor;
            header.style.backgroundImage = style.headerColor;
        }
    });
}

const jump = () => {
    if (!stateMario) {
        stateMario = true;
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
            stateMario = false; // Permite novo pulo
        }, 500);
    }
}

// Função para verificar colisão e atualizar pontuação
const verificarColisao = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // Se Mario colidir com o pipe
        pipe.style.animation = 'none'; // Para a animação do pipe
        pipe.style.left = `${pipePosition}px`; // Mantém a posição do pipe
        alert("Game Over!"); // Adicione uma mensagem de fim de jogo
        clearInterval(loop); // Para o loop de animação
        return; // Sai da função
    }

    // Se Mario saltou sobre o pipe
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition >= 80 && !pipePassed) {
        constadorFinal++;
        atualizarPontuacao();
        pipePassed = true; // Marca que o pipe foi passado
    } else if (pipePosition > 120) {
        pipePassed = false; // Reseta se o Mario não passou o pipe
    }

    requestAnimationFrame(verificarColisao);
};

// Inicia a verificação de colisão
requestAnimationFrame(verificarColisao);
document.addEventListener('keydown', jump);
mobile.addEventListener('click', jump);
