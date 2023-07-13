import React, { useState } from 'react';

const SortingCount = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event) => {
    setSelectedOption(event?.target?.value);
    onChange(event?.target?.value);
  };

  return (
    <div>
      Items per page:{' '}
      <select value={selectedOption} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortingCount;
