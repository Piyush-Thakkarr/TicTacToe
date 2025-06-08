document.addEventListener('DOMContentLoaded', () => 
{
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const statusDisplay = document.querySelector('.status');
    const scoreXElement = document.getElementById('scoreX');
    const scoreOElement = document.getElementById('scoreO');
    const modal = document.getElementById('gameOverModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalButton = document.getElementById('modalButton');

    let currentPlayer = 'X'; 
    let gameActive = true;
    let scores = { X: 0, O: 0 };

    scoreXElement.textContent = '0';
    scoreOElement.textContent = '0';

    modalButton.addEventListener('click', () => {
    modal.style.display = 'none';
    resetGame();
});

    function updateStatus() {
    if (!gameActive) return;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

    function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
    currentPlayer = 'X';
    gameActive = true;
    waitingForCPU = false;
    updateStatus();
}

    resetButton.addEventListener('click', resetGame); 

    function getEmptyCells() 
    {
    return Array.from(cells).map((cell, index) => 
        cell.textContent === '' ? index : null
    ).filter(val => val !== null);
}

    function makeCPUMove() 
    {
        const emptyCells = getEmptyCells();
        if (emptyCells.length > 0) 
        {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const cellIndex = emptyCells[randomIndex];
            const cell = cells[cellIndex];
        
            cell.textContent = currentPlayer;
            cell.classList.add('o');
        
        if (!checkWin() && !checkDraw() && gameActive) 
        {
            currentPlayer = 'X';
            updateStatus();
        } else if (!gameActive) 
        {
            currentPlayer = '';
        }
    }
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
    function showGameOver(message) 
    {
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

    function checkWin() 
    {
    for (let combo of winningConditions) {
        const [a, b, c] = combo;
        if (cells[a].textContent === currentPlayer && 
            cells[b].textContent === currentPlayer && 
            cells[c].textContent === currentPlayer) 
        {
            gameActive = false;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            
            scores[currentPlayer]++;
            document.getElementById(`score${currentPlayer}`).textContent = scores[currentPlayer];
            
            setTimeout(() => showGameOver(`Player ${currentPlayer} wins!`), 500);
            return true;
        }
    }
    return false;
}

    function checkDraw() 
    {
    const allFilled = [...cells].every(cell => cell.textContent !== '');
    if (allFilled && gameActive) 
    {
        gameActive = false;
        setTimeout(() => showGameOver('Game ended in a draw!'), 500);
        return true;
    }
    return false;
}
    cells.forEach(cell => 
    {
        cell.addEventListener('click', () => 
        {
                if (cell.textContent !== '' || !gameActive || currentPlayer !== 'X') 
            {
                return;
            }
        
        cell.textContent = currentPlayer;
        cell.classList.add('x');
        
        if (!checkWin() && !checkDraw()) 
        {
            currentPlayer = 'O';
            updateStatus();
            setTimeout(makeCPUMove, 300);
        }
    });
});
});
