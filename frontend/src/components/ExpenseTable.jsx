const ExpenseTable = ({
  expenses,
  onEdit,
  onDelete,
  showActions = true,
}) => {

  return (

    <div className="bg-white rounded shadow overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Description</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>

            {showActions &&
              <th className="p-3">Action</th>
            }

          </tr>

        </thead>

        <tbody>

          {expenses.map((expense) => (

            <tr
              key={expense.id}
              className="border-t"
            >

              <td className="p-3">
                {expense.title}
              </td>

              <td className="p-3">
                {expense.category}
              </td>

              <td className="p-3">
                {expense.description}
              </td>

              <td
  className={`p-3 font-semibold ${
    expense.type === "INCOME"
      ? "text-green-600"
      : "text-red-600"
  }`}
>
  {expense.type === "INCOME"
    ? `+ ₹${expense.amount}`
    : `- ₹${expense.amount}`}
</td>

              <td className="p-3">
                {
                  expense.date
                  ?.split("T")[0]
                }
              </td>

              {showActions && (

                <td className="p-3 flex gap-2">

                  <button
                    onClick={() =>
                      onEdit(expense)
                    }
                    className="
                    bg-blue-500
                    text-white
                    px-3
                    py-1
                    rounded
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(expense.id)
                    }
                    className="
                    bg-red-500
                    text-white
                    px-3
                    py-1
                    rounded
                    "
                  >
                    Delete
                  </button>

                </td>

              )}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
};

export default ExpenseTable;