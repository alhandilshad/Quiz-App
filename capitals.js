const questions = [
    {
        question: "What is the capital of Bahrain?",
        answers: [
            { text: "Manama", correct: true},
            { text: "Costa Rica", correct: false},
            { text: "Physia", correct: false},
            { text: "Katuysk", correct: false},
        ]
    },
    {
        question: "What is the capital of Austrailia?",
        answers: [
            { text: "California", correct: false},
            { text: "Tokyo", correct: false},
            { text: "Canberra", correct: true},
            { text: "Melbourne", correct: false},
        ]
    },
    {
        question: "What is the capital of New Zealand?",
        answers: [
            { text: "Yubari king melon", correct: false},
            { text: "Kutan", correct: false},
            { text: "Forbia", correct: false},
            { text: "Wellington", correct: true},
        ]
    },
    {
        question: "What is the capital of Canada?",
        answers: [
            { text: "Washington", correct: false},
            { text: "Otawwa", correct: true},
            { text: "Palekele", correct: false},
            { text: "Cucumb", correct: false},
        ]
    },
    {
        question: "What is the capital of China?",
        answers: [
            { text: "Beijing", correct: true},
            { text: "Arabia", correct: false},
            { text: "Oshawa", correct: false},
            { text: "Russia", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let sound = new Audio("a.wav");
let music = new Audio(";.wav");
const quiz = document.getElementById("quiz");
const capitals = document.getElementById("capitals");

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

capitals.addEventListener('click', ()=>{
    quiz.style.display = "block";
    capitals.style.background = "#001e4d";
    capitals.style.color = "#fff";
});

startQuiz();