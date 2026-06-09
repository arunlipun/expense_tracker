





import { useEffect, useState } from "react";
import { getUserDashboard } from "../../api/dashboardApi";


const Dashboard = () => {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response = await getUserDashboard();
        console.log(dashboard)

        setDashboard(response.data.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchDashboard();

  }, []);

  if (!dashboard)
    return <h2>Loading...</h2>;

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        User Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-green-500 text-white p-4 rounded">
          <h3>Total Income</h3>
          <p>₹ {dashboard.totalIncome}</p>
        </div>

        <div className="bg-red-500 text-white p-4 rounded">
          <h3>Total Expense</h3>
          <p>₹ {dashboard.totalExpense}</p>
        </div>

        <div className="bg-blue-500 text-white p-4 rounded">
          <h3>Balance</h3>
          <p>₹ {dashboard.balance}</p>
        </div>

        <div className="bg-purple-500 text-white p-4 rounded">
          <h3>Total Transactions</h3>
          <p>{dashboard.totalTransactions}</p>
        </div>

      </div>

      {/* Recent Transactions */}

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Recent Transactions
      </h2>

      <table className="w-full border bg-white">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Type</th>
            <th className="p-3">Date</th>

          </tr>

        </thead>

        <tbody>

          {dashboard.recentTransactions.map((item) => (

            <tr key={item.id}>

              <td className="p-3">{item.title}</td>

              <td className="p-3">{item.category}</td>

              <td className="p-3">₹ {item.amount}</td>

                <span
    className={`px-2 py-1 rounded text-sm font-medium ${
      item.type === "INCOME"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {item.type}
  </span>

              <td className="p-3">
                {new Date(item.date).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Category Wise */}

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Category Wise Expenses
      </h2>

      <table className="w-full border bg-white">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3">Category</th>

            <th className="p-3">Total Amount</th>

            <th className="p-3">Transactions</th>

          </tr>

        </thead>

        <tbody>

          {dashboard.categoryWiseExpenses.map(
            (item, index) => (

              <tr key={index}>

                <td className="p-3">
                  {item.category}
                </td>

                <td className="p-3">
                  ₹ {item.totalAmount}
                </td>

                <td className="p-3">
                  {item.transactionCount}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
};

export default Dashboard;