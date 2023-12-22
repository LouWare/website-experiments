document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".game-btn");
    const startButton = document.getElementById("start-btn");
    let sequence = [];
    let userSequence = [];
    let inProgress = false;
    let gameStarted = false;
    let highscore = localStorage.getItem('highscore') || 0;
    document.getElementById("highscore-value").textContent = highscore;

    const flashButton = (id) => {
        const button = document.getElementById(`btn-${id}`);
        button.classList.add("active");
        setTimeout(() => {
            button.classList.remove("active");
        }, 500);
    };

    const playSequence = () => {
        inProgress = true;
        let i = 0;
        const interval = setInterval(() => {
            flashButton(sequence[i]);
            i++;
            if (i >= sequence.length) {
                clearInterval(interval);
                inProgress = false;
            }
        }, 600);
    };

const flashAllButtonsRed = () => {
    buttons.forEach(button => {
        button.classList.add("wrong");
    });
    setTimeout(() => {
        buttons.forEach(button => {
            button.classList.remove("wrong");
        });
    }, 2000); // Die Dauer sollte der Länge der CSS-Animation entsprechen
};

    const addToSequence = () => {
        const randomNumber = Math.floor(Math.random() * 9) + 1;
        sequence.push(randomNumber);
        playSequence();
    };

    const checkUserSequence = () => {
        if (userSequence.length === sequence.length) {
            if (userSequence.every((value, index) => value === sequence[index])) {
                setTimeout(() => {
                    userSequence = [];
                    addToSequence();
                    updateHighscore(); // Highscore aktualisieren und speichern
                }, 1000);
            } else {
                flashAllButtonsRed(); // Alle Knöpfe blinken rot
                sequence = [];
                userSequence = [];
                inProgress = false;
                gameStarted = false; // Setzen Sie 'gameStarted' zurück, um das Spiel neu zu starten
            }
        }
    };

    // Funktion, um den Highscore zu aktualisieren und in localStorage zu speichern
    const updateHighscore = () => {
        if (sequence.length - 1 > highscore) {
            highscore = sequence.length - 1;
            document.getElementById("highscore-value").textContent = highscore;
            localStorage.setItem('highscore', highscore);
        }
    };

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (!inProgress && gameStarted) {
                const id = button.id.split("-")[1];
                userSequence.push(parseInt(id));
                flashButton(id);
                checkUserSequence();
            }
        });
    });

    startButton.addEventListener("click", () => {
        if (!inProgress && sequence.length === 0) {
            gameStarted = true; // Spiel als gestartet markieren
            addToSequence();
        }
    });
});