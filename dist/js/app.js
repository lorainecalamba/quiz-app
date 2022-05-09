const nextButton = document.querySelector('#nextButton');
const restartButton = document.querySelector('#restartButton');
const currentDiv = document.querySelector('#current');
const doneDiv = document.querySelector('#done');
const scoreSpan = document.querySelector('.score');
const maxNumber = document.querySelector('.number-of-questions');
const alertMessage = document.querySelector('#alertMessage');

const questions = [
  {
    question: 'Why so JavaScript and Java have similar name?',
    choices:
      [
        'JavaScript is a stripped-down version of Java',
        'JavaScript\'s syntax is loosely based on Java\'s',
        'They both originated on the island of Java',
        'None of the above'
      ],
    correct: 1,
  },
  {
    question: 'When a user views a page containing a JavaScript program, which machine actually executes the script?',
    choices:
      [
        'The User\'s machine running a Web browser',
        'The Web server',
        'A central machine deep within Netscape\'s corporate offices',
        'None of the above'
      ],
    correct: 0
  },
  {
    question: '______ JavaScript is also called client-side JavaScript.',
    choices:
      [
        'Microsoft',
        'Navigator',
        'LiveWire',
        'Native'
      ],
    correct: 1
  },
  {
    question: 'What are variables used for in JavaScript Programs?',
    choices:
      [
        'Storing numbers, dates, or other value',
        'Varying randomly',
        'Causing high-school algebra flashbacks',
        'None of the above'
      ],
    correct: 0
  },
  {
    question: 'Which of the following can\'t be done with client-side JavaScript?',
    choices:
      [
        'Validating a form',
        'Sending a form\'s contents by email',
        'Storing the form\'s contents to a database file on the server',
        'None of the above'
      ],
    correct: 2
  },
  {
    question: 'JavaScript entities start with _______ and end with _________.',
    choices:
      [
        'Semicolon, colon',
        'Semicolon, Ampersand',
        'Ampersand, colon',
        'Ampersand, semicolon'
      ],
    correct: 3
  },
  {
    question: 'Which of the following best describes JavaScript?',
    choices:
      [
        'a low-level programming language.',
        'a scripting language precompiled in the browser.',
        'a compiled scripting language.',
        'an object-oriented scripting language.'
      ],
    correct: 3
  },
];

// declared initial variables
let currentQuestionNumber = 0;
let score = 0;
const maxNumberOfQuestions = questions.length - 1;

// * display current number
const displayQuestionNumber = function (questionNumber) {
  document.querySelector('#question-number').textContent = questionNumber + 1;
}

//  * display current question
const diplayQuestion = function (questionNumber) {
  document.querySelector('#question').textContent = questions[questionNumber].question;
}

// * create input radio button
const createInput = function (choice, choiceIndex, questionNumber) {
  // const inputElement = `<input type="radio" value="${choice}" name="question_${questionNumber}"> ${choice}`;
  const inputElement = `<input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="question_${questionNumber}" id="flexRadioDefault${choiceIndex}" value="${choice}">
  <label class="form-check-label inline-block text-gray-800 cursor-pointer" for="flexRadioDefault${choiceIndex}">
    ${choice}
  </label>`;

  return inputElement;
}

// * display all choices from the current index
const displayChoices = function (questionNumber) {
  const choices = questions[questionNumber].choices;
  let inputFields = "";

  for (let i = 0; i < choices.length; i++) {
    inputFields += createInput(choices[i], i, questionNumber) + "<br>";

  }
  document.querySelector('#choices').innerHTML = inputFields;

}

// *count score from the current input
const countScore = function (userChoice) {

  const correctAnswerIndex = questions[currentQuestionNumber].correct;
  const correctAnswerFromChoices = questions[currentQuestionNumber].choices[correctAnswerIndex]

  // * if the user input is correct add score
  if (correctAnswerFromChoices == userChoice) {
    score++;
  }

  console.log(correctAnswerFromChoices, userChoice, score);

}

// TODO:: create error

const displayErrorAlert = function () {

  const alertElement = `<div class="px-6 py-4 bg-red-800 rounded-lg text-white">
        Please select from the options!
      </div>
    </div>`;

  alertMessage.innerHTML = alertElement;

  hideAlertMessage(3000);

}

const hideAlertMessage = function (ml) {
  if (alertMessage.firstChild) {
    setTimeout(() => {
      alertMessage.innerHTML = '';
    }, ml)
  }
}

// validate if user select a radio button
const validateInput = function (questionNumber) {
  const userInput = document.querySelector(`input[name=question_${questionNumber}]:checked`);

  // return userInput != null ? true : alert('Please select something');
  return userInput != null ? true : displayErrorAlert();
}

/* 
  ! this will display once page loads
  ! display question number
  ! display current question
  ! display all choices from current question
*/

const displayAll = function (questionNumber) {
  displayQuestionNumber(questionNumber);
  diplayQuestion(questionNumber);
  displayChoices(questionNumber);
}


// * display first question on load
displayAll(currentQuestionNumber);

const nextQuestion = function () {

  // if alert message is not empty hide it before next question displays
  hideAlertMessage();

  const validated = validateInput(currentQuestionNumber);

  if (validated) {
    const userInput = document.querySelector(`input[name=question_${currentQuestionNumber}]:checked`).value;

    countScore(userInput);

    // display question if not exceed to max number of questions currently in the array
    if (maxNumberOfQuestions > currentQuestionNumber) {
      currentQuestionNumber++;
      displayAll(currentQuestionNumber);
    } else {
      doneDiv.classList.toggle('hidden');
      currentDiv.classList.add('hidden');
      scoreSpan.textContent = score;
      maxNumber.textContent = maxNumberOfQuestions + 1;
    }
  }
}

//  function to restart quiz
const restartQuiz = function () {
  score = 0;
  currentQuestionNumber = 0;
  doneDiv.classList.toggle('hidden');
  currentDiv.classList.remove('hidden');
  displayAll(currentQuestionNumber);
}

// display next question
nextButton.addEventListener('click', nextQuestion);

// call function restart quiz
restartButton.addEventListener('click', restartQuiz);





