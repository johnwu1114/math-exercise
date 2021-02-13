import QuizPage from "./pages/quiz-page.jsx";

import SchulteTableQuestionBank from "./libs/question-bank/schulte-table.js";
import AdditionQuestionBank from "./libs/question-bank/addition.js";
import SubtractionQuestionBank from "./libs/question-bank/subtraction.js";
import MultiplicationQuestionBank from "./libs/question-bank/multiplication.js";
import ClockQuestionBank from "./libs/question-bank/clock.js";

export const AppRoutes = [{
    path: "schulte-table",
    component: <QuizPage questionBank={() => new SchulteTableQuestionBank()}/>
},
{
    path: "addition",
    component: <QuizPage questionBank={() => new AdditionQuestionBank()}/>
},
{
    path: "subtraction",
    component: <QuizPage questionBank={() => new SubtractionQuestionBank()}/>
},
{
    path: "multiplication-9x9",
    component: <QuizPage questionBank={() => new MultiplicationQuestionBank()}/>
},
{
    path: "multiplication-19x19",
    component: <QuizPage questionBank={() => new MultiplicationQuestionBank(2)}/>
},
{
    path: "clock",
    component: <QuizPage questionBank={() => new ClockQuestionBank()}/>
}];