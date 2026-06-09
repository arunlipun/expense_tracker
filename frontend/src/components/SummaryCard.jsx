import React from 'react'

const SummaryCard = ({
  title,
  value,
}) => {
  return (
    <div
      className="
      bg-white
      border
      border-gray-200
      rounded-lg
      shadow-sm
      p-5
      "
    >
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mt-2">
        {value}
      </h2>
    </div>
  );
};

export default SummaryCard;
