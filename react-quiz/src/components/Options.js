import { Toaster, toast } from 'react-hot-toast';
import { useQuiz } from '../contexts/QuizContext';

function Options() {
  const { questions: question, dispatch, answer, index: i } = useQuiz();
  const hasAnswered = answer !== null;

  return (
    <>
      <Toaster />
      <div className="options">
        {question[i].options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              hasAnswered
                ? index === question[i].correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            key={option}
            disabled={hasAnswered}
            onClick={() => {
              dispatch({ type: 'newAnswer', payload: index });
              index === question[i].correctOption
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
