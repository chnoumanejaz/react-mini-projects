function Progress({ index, numQuestions, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + +(answer !== null)}></progress>
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
