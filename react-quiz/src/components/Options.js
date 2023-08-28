import { Toaster, toast } from 'react-hot-toast';

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <>
      <Toaster/>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              hasAnswered
                ? index === question.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            key={option}
            disabled={hasAnswered}
            onClick={() => {
              dispatch({ type: 'newAnswer', payload: index });
              index === question.correctOption
                ? toast.success('Correct Answer 😉')
                : toast.error('Wrong Answer 😥');
            }}>
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

export default Options;
