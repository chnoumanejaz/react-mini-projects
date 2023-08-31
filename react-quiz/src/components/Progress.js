import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, numQuestions, points, maxPoints, answer } = useQuiz()
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}></progress>
      <p>
        Question <b>{index + 1}</b>/ <b>{numQuestions}</b>{' '}
      </p>
      <p>
        <b>{points}</b> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
