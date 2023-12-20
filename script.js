document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".game-btn");
    const startButton = document.getElementById("start-btn");
    let sequence = [];
    let userSequence = [];
    let inProgress = false;

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
                }, 1000);
            } else {
                alert("Falsche Sequenz! Spiel beendet.");
                sequence = [];
                userSequence = [];
                inProgress = false;
            }
        }
    };

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (!inProgress) {
                const id = button.id.split("-")[1];
                userSequence.push(parseInt(id));
                flashButton(id);
                checkUserSequence();
            }
        });
    });

    startButton.addEventListener("click", () => {
        if (!inProgress && sequence.length === 0) {
            addToSequence();
        }
    });
});
