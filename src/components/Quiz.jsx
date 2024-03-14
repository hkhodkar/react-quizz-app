import { useCallback, useState } from 'react';
import questions from '../questions.js';
import quizComplete from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';


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

    const shuffleAnswers = [...questions[questionIndex].answers];
    shuffleAnswers.sort(() => Math.random() - 0.5);


    return (
        <div id="quiz">
            <QuestionTimer
                key={questionIndex}
                timeout={5000}
                onTimeout={handleSkipAnswer} />
            <div id="question">
                <h2>{questions[questionIndex].text}</h2>
                <ul id='answers'>
                    {shuffleAnswers.map(answer => {
                        const isSelected = answeredQuestion[answeredQuestion.length - 1] === answer;
                        let cssClass = '';

                        if (answerState === 'answered' && isSelected) {
                            cssClass = 'selected'
                        }

                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClass = answerState;
                        }

                        return (
                            <li key={answer} className='answer'>
                                <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                                    {answer}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}