import { Radio } from 'antd';
import React, { useState } from 'react';

const QuestionContainer  = ({ question,onSelectOption,options }:any) => {
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (option:any) => {
    setSelectedOption(option);
    onSelectOption(option);
  };

  return (
    <div>
      <h3 className='question-title'>{question}</h3>
      <ul className='question-ul'>
        {options.map((option:any, index:any) => (
          <li className='question-list' key={index}>
            <div className='radio-wrapper'>
              <Radio
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionContainer;
