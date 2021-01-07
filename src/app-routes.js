import QuizPage from "./pages/quiz-page.jsx";

import SchulteTableQuestionBank from "./libs/question-bank/schulte-table.js";
import AdditionQuestionBank from "./libs/question-bank/addition.js";
import SubtractionQuestionBank from "./libs/question-bank/subtraction.js";
import MultiplicationQuestionBank from "./libs/question-bank/multiplication.js";
import ClockQuestionBank from "./libs/question-bank/clock.js";

export const AppRoutes = [{
    path: "/schulte-table",
    title: "舒爾特方格",
    component: <QuizPage questionBank={new SchulteTableQuestionBank()}/>
},
{
    path: "/addition",
    title: "加法練習",
    component: <QuizPage questionBank={new AdditionQuestionBank()}/>
},
{
    path: "/subtraction",
    title: "減法練習",
    component: <QuizPage questionBank={new SubtractionQuestionBank()}/>
},
{
    path: "/multiplication-9x9",
    title: "9 x 9 乘法練習",
    component: <QuizPage questionBank={new MultiplicationQuestionBank()}/>
},
{
    path: "/multiplication-19x19",
    title: "19 x 19 乘法練習",
    component: <QuizPage questionBank={new MultiplicationQuestionBank(2)}/>
},
{
    path: "/clock",
    title: "時鐘練習",
    component: <QuizPage questionBank={new ClockQuestionBank()}/>
}];