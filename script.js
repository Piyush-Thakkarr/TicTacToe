document.addEventListener('DOMContentLoaded', () => {
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X'; 
let gameActive = true;
let waitingForCPU = false;

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    waitingForCPU = false;
}

// Add event listener for reset button
resetButton.addEventListener('click', resetGame); 

function getEmptyCells() {
    return Array.from(cells).map((cell, index) => 
        cell.textContent === '' ? index : null
    ).filter(val => val !== null);
}

function makeCPUMove() {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cellIndex = emptyCells[randomIndex];
        cells[cellIndex].textContent = currentPlayer;
        checkWin();
        checkDraw();
        
        if (gameActive) {
            currentPlayer = 'X';
        } else {
            // If game is over, don't switch back to player
            currentPlayer = '';
        }
    }
    waitingForCPU = false;
}

const winningConditions = 
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; 
function checkWin() 
{
    for (let combo of winningConditions) 
    {
        const [a, b, c] = combo;
        if (cells[a].textContent === currentPlayer && 
            cells[b].textContent === currentPlayer && 
            cells[c].textContent === currentPlayer) 
        {
            gameActive = false;
            alert(`${currentPlayer} wins!`);
            return;
        }
    }
}
function checkDraw() {
    const allfilled = [...cells].every(cell => cell.textContent !== '');
    if (allfilled && gameActive) {
        gameActive = false;
        alert('Draw!');
    }
}
cells.forEach(cell => 
{
    cell.addEventListener('click', () => 
    {
        if (cell.textContent !== '' || !gameActive || waitingForCPU || currentPlayer !== 'X') {
            return;
        }
        
        // Make player's move
        cell.textContent = currentPlayer; 
        checkWin();
        checkDraw();
        
        if (gameActive) {
            waitingForCPU = true;
            currentPlayer = 'O';
            setTimeout(makeCPUMove, 500);
        }
    });
});
});
