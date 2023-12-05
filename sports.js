const questions = [
    {
        question: "Which Country invented cricket?",
        answers: [
            { text: "England", correct: true},
            { text: "Austrailia", correct: false},
            { text: "Westindies", correct: false},
            { text: "India", correct: false},
        ]
    },
    {
        question: "Which is the national game of Pakistan?",
        answers: [
            { text: "Cricket", correct: false},
            { text: "Hockey", correct: true},
            { text: "FootBall", correct: false},
            { text: "Rugby", correct: false},
        ]
    },
    {
        question: "In which country where the olympics games held in 2021?",
        answers: [
            { text: "Germany", correct: false},
            { text: "Astana", correct: false},
            { text: "England", correct: false},
            { text: "Japan", correct: true},
        ]
    },
    {
        question: "Which country won FIFA World Cup 2022?",
        answers: [
            { text: "Brazil", correct: false},
            { text: "Argentina", correct: true},
            { text: "Portugal", correct: false},
            { text: "Germany", correct: false},
        ]
    },
    {
        question: "How many players in a single team, in cricket ?",
        answers: [
            { text: "13", correct: false},
            { text: "10", correct: false},
            { text: "9", correct: false},
            { text: "11", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let sound = new Audio("a.wav");
let music = new Audio(";.wav");
const quiz = document.getElementById("quiz");
const sports = document.getElementById("sports");

let currentquestionindex = 0;
let score = 0;

function startQuiz(){
    currentquestionindex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentquestion = questions[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionElement.innerHTML = questionno + " . " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        sound.play();
        selectedBtn.classList.add("correct");
        score++;
    }else{
        music.play();
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} Out Of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentquestionindex++;
    if(currentquestionindex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentquestionindex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

sports.addEventListener('click', ()=>{
    quiz.style.display = "block";
    sports.style.background = "#001e4d";
    sports.style.color = "#fff";
});

startQuiz();