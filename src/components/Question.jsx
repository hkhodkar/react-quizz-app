import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({ questionText, answers, selectedAnswer, answerState, onSelect, handleSkipAnswer }) {
    return (
        <div id="question">
            <QuestionTimer
                timeout={5000}
                onTimeout={handleSkipAnswer} />
            <h2>{questionText}</h2>
            <Answers
                answers={answers}
                selectedAnswer={selectedAnswer}
                answerState={answerState}
                onSelect={onSelect} />
        </div>
    )
}