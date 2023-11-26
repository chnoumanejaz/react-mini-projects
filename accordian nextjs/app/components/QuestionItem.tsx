// QuestionItem.tsx
import React, { FC } from 'react';

interface QuestionItemProps {
  id: string;
  question: string;
  answer: string;
  selected: boolean;
  handleSelected: (id: string) => void;
}

const QuestionItem: FC<QuestionItemProps> = ({
  id,
  question,
  answer,
  selected,
  handleSelected,
}) => {
  return (
    <>
      <div className="bg-gray-600 text-gray-50 py-2 px-4 rounded-sm mt-2">
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={selected}
            className="cursor-pointer"
            onChange={() => handleSelected(id)}
          />
          <p>{question}</p>
        </div>
      </div>
      <div
        className={
          selected
            ? 'max-h-full mb-3 px-3 overflow-hidden py-1 transition-all duration-300'
            : 'max-h-0 overflow-hidden transition-all duration-300'
        }>
        {answer}
      </div>
    </>
  );
};

export default QuestionItem;
