import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, maxPoints, highscore, dispatch } = useQuiz()
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 60 && percentage < 80) emoji = '😥';
  if (percentage >= 0 && percentage < 60) emoji = '🤦‍♂️';

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Scored <b>{points}</b> points out of{' '}
        {maxPoints} points ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
