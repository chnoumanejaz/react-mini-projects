// AppLayout.tsx
'use client';
import React, { FC, useState } from 'react';
import { data } from '../data/data';
import QuestionItem from './QuestionItem';

const AppLayout: FC = () => {
  const [selected, setSelected] = useState<string>('');

  const handleSelected = (id: string) => {
    if (selected === id) return setSelected('');
    setSelected(id);
  };

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="bg-white border border-gray-50 rounded-md px-8 py-4 shadow-md w-1/2 h-[600px] overflow-y-scroll">
        <h1 className="font-semibold text-2xl border-b pb-2 mb-4">QNA</h1>
        {data.map(item => (
          <QuestionItem
            key={item.id}
            id={item.id}
            question={item.question}
            answer={item.answer}
            selected={selected === item.id}
            handleSelected={handleSelected}
          />
        ))}
      </div>
    </main>
  );
};

export default AppLayout;
