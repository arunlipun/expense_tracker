import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/adminApi";

const UserSummary = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  // Dashboard API se userWiseSummary nikal rahe hain
  const loadUsers = async () => {
    try {

      const res = await getAdminDashboard();

      setUsers(
        res.data.data.userWiseSummary
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        User Summary
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border shadow rounded">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 border">
                User Name
              </th>

              <th className="p-3 border">
                Email
              </th>

              <th className="p-3 border">
                Total Income
              </th>

              <th className="p-3 border">
                Total Expense
              </th>

              <th className="p-3 border">
                Net Balance
              </th>

              <th className="p-3 border">
                Transactions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.userId}
                className="hover:bg-gray-50"
              >

                <td className="p-3 border">
                  {user.userName}
                </td>

                <td className="p-3 border">
                  {user.email}
                </td>

                <td className="p-3 border text-green-600 font-semibold">
                  ₹ {user.totalIncome}
                </td>

                <td className="p-3 border text-red-600 font-semibold">
                  ₹ {user.totalExpense}
                </td>

                <td className="p-3 border text-blue-600 font-semibold">
                  ₹ {user.netBalance}
                </td>

                <td className="p-3 border">
                  {user.totalTransactions}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default UserSummary;