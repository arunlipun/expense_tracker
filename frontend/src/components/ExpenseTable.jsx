

const ExpenseTable = ({
  expenses,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-4 text-left font-semibold">Title</th>
              <th className="px-4 py-4 text-left font-semibold">Category</th>
              <th className="px-4 py-4 text-left font-semibold">Description</th>
              <th className="px-4 py-4 text-left font-semibold">Amount</th>
              <th className="px-4 py-4 text-left font-semibold">Date</th>
              {showActions && (
                <th className="px-4 py-4 text-left font-semibold">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-t border-slate-200 transition hover:bg-slate-50"
              >
                <td className="px-4 py-4 text-slate-700">{expense.title}</td>
                <td className="px-4 py-4 text-slate-600">{expense.category}</td>
                <td className="px-4 py-4 text-slate-600">
                  {expense.description}
                </td>
                <td
                  className={`px-4 py-4 font-semibold ${
                    expense.type === "INCOME"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {expense.type === "INCOME"
                    ? `+ ₹${expense.amount}`
                    : `- ₹${expense.amount}`}
                </td>
                <td className="px-4 py-4 text-slate-600">
                  {expense.date?.split("T")[0]}
                </td>

                {showActions && (
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => onEdit(expense)}
                        className="rounded-lg bg-blue-500 px-3 py-2 text-white transition hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(expense.id)}
                        className="rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;