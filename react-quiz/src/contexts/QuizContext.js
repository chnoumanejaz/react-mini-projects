import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

function QuizProvider({ children }) {
  const SEC_PER_QUESTION = 30;

  const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    timeRemaining: 10,
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'dataRecived':
        return { ...state, questions: action.payload, status: 'ready' };
      case 'dataFailed':
        return { ...state, status: 'error' };
      case 'start':
        return {
          ...state,
          status: 'active',
          timeRemaining: state.questions.length * SEC_PER_QUESTION,
        };
      case 'newAnswer':
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case 'nextQuestion':
        return { ...state, index: state.index + 1, answer: null };
      case 'finish':
        return {
          ...state,
          status: 'finish',
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case 'restart':
        return {
          ...initialState,
          questions: state.questions,
          status: 'ready',
          highscore: state.highscore,
        };
      case 'timer':
        return {
          ...state,
          timeRemaining: state.timeRemaining - 1,
          status: state.timeRemaining === 0 ? 'finish' : state.status,
        };
      default:
        throw new Error('Unknown Action!');
    }
  }

  const [
    { questions, status, index, answer, points, highscore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRecived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        timeRemaining,
        numQuestions,
        maxPoints,
        dispatch,
      }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('QuizContext cannot be used outside the QuizProvider');
  return context;
}

export { QuizProvider, useQuiz };
