// Dados iniciais
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let playing = false;
let player = 'x';
let warning = '';

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach((item)=>{
    item.addEventListener('click', (e) => {
        let loc = e.target.getAttribute('data-item');
        
        if(playing && quadro[loc] === '') {
            square[loc] = player;
            renderQuadro();
            togglePlayer();
        }
    });
});

// Funções
function reset() {
    warning = '';

    // definir a player
    let random = Math.floor(Math.random() * 2);
    player = random === 0 ? 'x' : 'o';

    // resetar os quadros
    for(let i in square) {
        square[i] = '';
    }

    // renderizar tudo
    renderQuadro();
    renderInfo();

    playing = true;
}

function renderQuadro() {
    for(let i in quadro) {
        let item = document.querySelector(`div[data-item=${i}]`);
        if(square[i] !== '') {
            item.innerHTML = square[i];
        } else {
            item.innerHTML = '';
        }
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.player').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    player = player === 'x' ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(i) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option=>square[option] === i);
        if(hasWon) return true;
    }

    return false;
}
function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }
    return true;
}