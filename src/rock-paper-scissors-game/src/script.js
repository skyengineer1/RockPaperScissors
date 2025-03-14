document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('#buttons button');
  const result = document.getElementById('result');
  const playerScoreElement = document.getElementById('player-score');
  const computerScoreElement = document.getElementById('computer-score');
  const resetButton = document.getElementById('reset');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const darkModeIcon = document.getElementById('dark-mode-icon');

  const clickSound = new Audio('click.mp3');
  const winSound = new Audio('win.mp3');
  const loseSound = new Audio('lose.mp3');

  let playerScore = 0;
  let computerScore = 0;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      clickSound.play();
      const playerChoice = button.id;
      const computerChoice = getComputerChoice();
      const winner = determineWinner(playerChoice, computerChoice);

      result.classList.remove('show');
      result.classList.add('hide');

      setTimeout(() => {
        result.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${winner}`;
        result.classList.remove('hide');
        result.classList.add('show');
      }, 500);

      if (winner === 'You win!') {
        playerScore++;
        winSound.play();
      } else if (winner === 'You lose!') {
        computerScore++;
        loseSound.play();
      }

      playerScoreElement.textContent = playerScore;
      computerScoreElement.textContent = computerScore;
    });
  });

  resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    result.textContent = 'Make your move';
  });

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      darkModeIcon.classList.remove('bi-moon-fill');
      darkModeIcon.classList.add('bi-sun-fill');
    } else {
      darkModeIcon.classList.remove('bi-sun-fill');
      darkModeIcon.classList.add('bi-moon-fill');
    }
  });

  function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function determineWinner(player, computer) {
    if (player === computer) {
      return "It's a tie!";
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'You win!';
    } else {
      return 'You lose!';
    }
  }
});