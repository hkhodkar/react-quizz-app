import { useCallback, useState } from 'react';
import questions from '../questions.js';
import quizComplete from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';


export default function Quiz() {

    const [answeredQuestion, setAnsweredQuestion] = useState([]);
    const [answerState, setAnswerState] = useState('');
    const questionIndex = answerState === '' ? answeredQuestion.length : answeredQuestion.length - 1;
    const isQuizCompleted = questionIndex === questions.length;


    const handleSelectAnswer = useCallback(function (selectedAnswer) {
        setAnswerState('answered');
        setAnsweredQuestion(prev => [...prev, selectedAnswer]);

        setTimeout(() => {
            if (selectedAnswer === questions[questionIndex].answers[0]) setAnswerState('correct')
            else (setAnswerState('wrong'));

            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000)
    }, [questionIndex])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])


    if (isQuizCompleted) {
        return (
            <div id='summary'>
                <img src={quizComplete} alt="Trophy" />
                <h2>Quiz Completed</h2>
            </div>
        )
    }

    return (
        <div id="quiz">
            <QuestionTimer
                key={questionIndex}
                timeout={5000}
                onTimeout={handleSkipAnswer} />
            <div id="question">
                <h2>{questions[questionIndex].text}</h2>
                <Answers
                    key={questionIndex}
                    answers={questions[questionIndex].answers} selectedAnswer={answeredQuestion[answeredQuestion.length - 1]}
                    answerState={answerState}
                    onSelect={handleSelectAnswer} />
            </div>
        </div>
    )
}