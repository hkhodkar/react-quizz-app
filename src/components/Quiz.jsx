import { useCallback, useState } from 'react';
import questions from '../questions.js';
import quizComplete from '../assets/quiz-complete.png';
import Question from './Question.jsx';


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
            <Question
                key={questionIndex}
                questionText={questions[questionIndex].text}
                answers={questions[questionIndex].answers}
                selectedAnswer={answeredQuestion[answeredQuestion.length - 1]}
                answerState={answerState}
                onSelect={handleSelectAnswer}
                handleSkipAnswer={handleSkipAnswer} />
        </div>
    )
}