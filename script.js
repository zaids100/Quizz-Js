const questions=[
    {
        question :"Which is largest animal in the world?",
        answers :[
            {text:"Shark",correct:false},
            {text:"Blue-Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
        ]
    },
    {
        question :"Which is India's National Bird?",
        answers :[
            {text:"Peacock",correct:true},
            {text:"Sparrow",correct:false},
            {text:"Hen",correct:false},
            {text:"Crow",correct:false}
        ]
    },
    {
        question :"Which is largest desert in the world?",
        answers :[
            {text:"Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:true},
            {text:"Antartica",correct:false}
        ]
    },
    {
        question :"Which is smallest continent in the world?",
        answers :[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Arctic",correct:false},
            {text:"Africa",correct:false}
        ]
    }
];


const quesElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuesIndex=0;
let score=0;


function startQuiz(){
    currentQuesIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion=questions[currentQuesIndex];
    let quesNo=currentQuesIndex+1;
    quesElement.innerHTML=quesNo+". "+currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        
        button.addEventListener("click",selectAns);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild)
    {
         answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAns(e){
    const selectedBtn=e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";

    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{  //to disable the buttons after the click
          if(button.dataset.correct==="true")
          {
            button.classList.add("correct");
          }
          button.disabled=true;
    });

    nextButton.style.display="block";
}

function showScore()
{
    resetState();
    quesElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play again";
    nextButton.style.display="block";
}


function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex < questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
       if(currentQuesIndex < questions.length)
       {
          handleNextButton();
       }
       else{
         startQuiz();
       }
});

startQuiz();