import { useQuiz } from '../contexts/QuizContext';
import Options from './Options';

function Question() {
  const { questions:question } = useQuiz();
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
