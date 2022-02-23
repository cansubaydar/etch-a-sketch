const frame = document.querySelector('.sketch-frame');
const gridSize = document.getElementById('grid-size');
const penColour = document.getElementById('colour');
const erase = document.querySelector('.erase'); 
let grid = document.querySelector('.sketch-grid');
let divs = document.querySelectorAll('.divs');

function randomNum(num) {
    return Math.floor(Math.random() * num + 1);
}

const touchEvent = (e) => {
    e.preventDefault();
    let moveStart = e.changedTouches[0];
    let targetPoint = document.elementFromPoint(moveStart.clientX, moveStart.clientY);
    
    if(targetPoint.parentElement.classList.contains('sketch-grid')) {
        if(penColour.value === 'classic') {
            targetPoint.style.backgroundColor = '#000';
        } else {
            let randomColour = 'rgb(' + randomNum(255) + ',' + randomNum(255) + ',' + randomNum(255) + ')';
            targetPoint.style.backgroundColor = randomColour;
        } 
    }
}

const changePenColour = () => {
    divs = document.querySelectorAll('.divs');
    divs.forEach(div => div.addEventListener('mouseover', () => {
        if(penColour.value === 'classic') {
            div.style.backgroundColor = '#000';
        } else {
            let randomColour = 'rgb(' + randomNum(255) + ',' + randomNum(255) + ',' + randomNum(255) + ')';
            div.style.backgroundColor = randomColour;
        }
    }))
}

function createDiv(square) {
    let { clientWidth, clientHeight } = grid;
    for (let i = 0; i < square * square; i++) {
        let divs = document.createElement('div');
        grid.appendChild(divs);
        divs.classList.add('divs');
        divs.addEventListener('touchmove', touchEvent);
    };
    changePenColour();
    grid.style.gridTemplateColumns = `repeat(${square}, ${clientWidth / square}px`;
    grid.style.gridTemplateRows = `repeat(${square}, ${clientHeight / square}px)`; 
}

createDiv(gridSize.value);

window.addEventListener('resize', () => {
    if(window.matchMedia('screen and (min-width: 48em)').matches|| 
        window.matchMedia('screen and (min-width: 30em)').matches) {
            createDiv(gridSize.value);
        }
    }); 

function removeDiv() {
    divs = document.querySelectorAll('.divs');
    divs.forEach(div => div.remove());
}

gridSize.addEventListener('change', (e) => {
        removeDiv();
        createDiv(e.target.value);
});

function eraseColour(e) {
    e.preventDefault();
    divs = document.querySelectorAll('.divs');
    divs.forEach(div => div.style.backgroundColor = 'transparent');
}

penColour.addEventListener('change', changePenColour);
erase.addEventListener('click', eraseColour);