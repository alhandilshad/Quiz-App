const questions = [
    {
        question: "Which one is a sea food?",
        answers: [
            { text: "Caviar", correct: true},
            { text: "Mushrooms", correct: false},
            { text: "Pizza", correct: false},
            { text: "Oysters", correct: false},
        ]
    },
    {
        question: "What is the most consumed fruit in the world?",
        answers: [
            { text: "Apple", correct: false},
            { text: "Mango", correct: false},
            { text: "Banana", correct: true},
            { text: "Appricot", correct: false},
        ]
    },
    {
        question: "What is the most expensive fruit in the world?",
        answers: [
            { text: "Yubari king melon", correct: true},
            { text: "Cheakpeas", correct: false},
            { text: "Burritto", correct: false},
            { text: "Paplean", correct: false},
        ]
    },
    {
        question: "What is the cheapest vegetable per pound?",
        answers: [
            { text: "Pees", correct: false},
            { text: "Potato", correct: true},
            { text: "Onion", correct: false},
            { text: "Cucumber", correct: false},
        ]
    },
    {
        question: "Which nut is used to make marzipan?",
        answers: [
            { text: "Peas", correct: false},
            { text: "Walnut", correct: false},
            { text: "Burritto", correct: false},
            { text: "Almonds", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let sound = new Audio("a.wav");
let music = new Audio(";.wav");
const quiz = document.getElementById("quiz");
const foods = document.getElementById("foods");

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

foods.addEventListener('click', ()=>{
    quiz.style.display = "block";
    foods.style.background = "#001e4d";
    foods.style.color = "#fff";
});

startQuiz();