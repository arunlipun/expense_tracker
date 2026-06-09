import React from 'react'

const FilterBar = ({
  typeFilter,
  setTypeFilter,
}) => {
  return (
    <div className="w-full md:w-56">
      <select
        value={typeFilter}
        onChange={(e) =>
          setTypeFilter(e.target.value)
        }
        className="
          w-full
          px-4
          py-2
          border
          border-gray-200
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      >
        <option value="all">
          All Transactions
        </option>

        <option value="income">
          Income
        </option>

        <option value="expense">
          Expense
        </option>
      </select>
    </div>
  );
};

export default FilterBar;