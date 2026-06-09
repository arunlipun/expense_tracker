// import { useEffect, useState } from "react";
// import { getAdminDashboard } from "../../api/adminApi";

// // Charts
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Legend
// } from "recharts";



// const AdminDashboard = () => {

//   // ==========================
//   // Store dashboard API data
//   // ==========================
//   const [dashboard, setDashboard] = useState(null);

//   // ==========================
//   // Page load hote hi API call
//   // ==========================
//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   // ==========================
//   // Backend dashboard data fetch
//   // GET /admin/dashboard
//   // ==========================
//   const loadDashboard = async () => {
//     try {

//       const res = await getAdminDashboard();

//       // response.data.data me actual data hai
//       setDashboard(res.data.data);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ==========================
//   // Loading State
//   // ==========================
//   if (!dashboard) {
//     return (
//       <h2 className="p-5">
//         Loading Dashboard...
//       </h2>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6">

//       {/* ==========================
//           Dashboard Heading
//       ========================== */}

//       <h1 className="text-2xl md:text-3xl font-bold mb-6">
//         Admin Dashboard
//       </h1>

//       {/* ==========================
//           Summary Cards
//           Backend Fields:
//           totalIncome
//           totalExpense
//           balance
//           totalRecords
//           totalIncomeRecords
//           totalExpenseRecords
//       ========================== */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

//         <div className="border rounded p-4 shadow bg-white">
//           <h3 className="font-semibold">
//             Total Income
//           </h3>

//           <p className="text-xl font-bold text-green-600">
//             ₹ {dashboard.totalIncome}
//           </p>
//         </div>

//         <div className="border rounded p-4 shadow bg-white">
//           <h3 className="font-semibold">
//             Total Expense
//           </h3>

//           <p className="text-xl font-bold text-red-600">
//             ₹ {dashboard.totalExpense}
//           </p>
//         </div>

//         <div className="border rounded p-4 shadow bg-white">
//           <h3 className="font-semibold">
//             Balance
//           </h3>

//           <p className="text-xl font-bold text-blue-600">
//             ₹ {dashboard.balance}
//           </p>
//         </div>

//         <div className="border rounded p-4 shadow bg-white">
//           <h3 className="font-semibold">
//             Total Records
//           </h3>

//           <p className="text-xl font-bold">
//             {dashboard.totalRecords}
//           </p>
//         </div>

//         <div className="border rounded p-4 shadow bg-white">
//           <h3 className="font-semibold">
//             Income Transactions
//           </h3>

//           <p className="text-xl font-bold">
//             {dashboard.totalIncomeRecords}
//           </p>
//         </div>

//         <div className="border rounded p-4 shadow bg-white">
//           <h3 className="font-semibold">
//             Expense Transactions
//           </h3>

//           <p className="text-xl font-bold">
//             {dashboard.totalExpenseRecords}
//           </p>
//         </div>

//       </div>

//       {/* ==========================
//           Expense Category Pie Chart

//           Backend Field:
//           categoryWiseExpenses
//       ========================== */}

//       <div className="mt-10 border rounded p-4 shadow bg-white">

//         <h2 className="text-xl font-bold mb-4">
//           Expense By Category
//         </h2>

//         <div style={{ width: "100%", height: 350 }}>

//           <ResponsiveContainer>

//             <PieChart>

//               <Pie
//                 data={dashboard.categoryWiseExpenses}
//                 dataKey="totalAmount"
//                 nameKey="category"
//                 outerRadius={120}
//                 label
//               >
//                 {
//                   dashboard.categoryWiseExpenses.map(
//                     (_, index) => (
//                       <Cell key={index} />
//                     )
//                   )
//                 }
//               </Pie>

//               <Tooltip />

//             </PieChart>

//           </ResponsiveContainer>

//         </div>

//       </div>

//       {/* ==========================
//           Monthly Income Expense Chart

//           Backend Field:
//           monthlyTrend
//       ========================== */}

//       <div className="mt-10 border rounded p-4 shadow bg-white">

//         <h2 className="text-xl font-bold mb-4">
//           Monthly Analysis
//         </h2>

//         <div style={{ width: "100%", height: 350 }}>

//           <ResponsiveContainer>

//             <BarChart
//               data={dashboard.monthlyTrend}
//             >

//               <XAxis dataKey="month" />

//               <YAxis />

//               <Tooltip />

//               <Legend />

//               {/* Income Bar */}

//               <Bar
//                 dataKey="totalIncome"
//               />

//               {/* Expense Bar */}

//               <Bar
//                 dataKey="totalExpense"
//               />

//             </BarChart>

//           </ResponsiveContainer>

//         </div>

//       </div>

//       {/* ==========================
//           Recent Transactions Table

//           Backend Field:
//           recentTransactions
//       ========================== */}

//       <div className="mt-10">

//         <h2 className="text-xl font-bold mb-3">
//           Recent Transactions
//         </h2>

//         <div className="overflow-x-auto">

//           <table className="w-full border">

//             <thead>

//               <tr className="bg-gray-100">

//                 <th className="p-2 border">
//                   Title
//                 </th>

//                 <th className="p-2 border">
//                   Category
//                 </th>

//                 <th className="p-2 border">
//                   Amount
//                 </th>

//                 <th className="p-2 border">
//                   Type
//                 </th>

//                 <th className="p-2 border">
//                   Date
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {
//                 dashboard.recentTransactions.map(
//                   (item) => (
//                     <tr key={item.id}>

//                       <td className="p-2 border">
//                         {item.title}
//                       </td>

//                       <td className="p-2 border">
//                         {item.category}
//                       </td>

//                       <td className="p-2 border">
//                         ₹ {item.amount}
//                       </td>

//                       <td className="p-2 border">
//                         {item.type}
//                       </td>

//                       <td className="p-2 border">
//                         {
//                           item.date
//                             ?.split("T")[0]
//                         }
//                       </td>

//                     </tr>
//                   )
//                 )
//               }

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default AdminDashboard;














import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/adminApi";

// Charts
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
];

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getAdminDashboard();
      setDashboard(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <h2 className="p-5 text-lg font-semibold">
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Heading */}

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 shadow bg-white">
          <h3 className="font-semibold text-gray-600">
            Total Income
          </h3>

          <p className="text-2xl font-bold text-green-600 mt-2">
            ₹ {dashboard.totalIncome}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow bg-white">
          <h3 className="font-semibold text-gray-600">
            Total Expense
          </h3>

          <p className="text-2xl font-bold text-red-600 mt-2">
            ₹ {dashboard.totalExpense}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow bg-white">
          <h3 className="font-semibold text-gray-600">
            Balance
          </h3>

          <p className="text-2xl font-bold text-blue-600 mt-2">
            ₹ {dashboard.balance}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow bg-white">
          <h3 className="font-semibold text-gray-600">
            Total Records
          </h3>

          <p className="text-2xl font-bold mt-2">
            {dashboard.totalRecords}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow bg-white">
          <h3 className="font-semibold text-gray-600">
            Income Transactions
          </h3>

          <p className="text-2xl font-bold mt-2">
            {dashboard.totalIncomeRecords}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow bg-white">
          <h3 className="font-semibold text-gray-600">
            Expense Transactions
          </h3>

          <p className="text-2xl font-bold mt-2">
            {dashboard.totalExpenseRecords}
          </p>
        </div>
      </div>

      {/* Expense Category Chart */}

      <div className="mt-10 border rounded-lg p-4 shadow bg-white">
        <h2 className="text-xl font-bold mb-4">
          Expense By Category
        </h2>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={dashboard.categoryWiseExpenses}
                dataKey="totalAmount"
                nameKey="category"
                outerRadius={100}
                label
              >
                {dashboard.categoryWiseExpenses.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Analysis */}

      <div className="mt-10 border rounded-lg p-4 shadow bg-white">
        <h2 className="text-xl font-bold mb-4">
          Monthly Analysis
        </h2>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart
              data={dashboard.monthlyTrend}
            >
              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="totalIncome"
                fill="#22c55e"
                name="Income"
              />

              <Bar
                dataKey="totalExpense"
                fill="#ef4444"
                name="Expense"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">
          Recent Transactions
        </h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border font-semibold">
                  Title
                </th>

                <th className="p-3 border font-semibold">
                  Category
                </th>

                <th className="p-3 border font-semibold">
                  Amount
                </th>

                <th className="p-3 border font-semibold">
                  Type
                </th>

                <th className="p-3 border font-semibold">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentTransactions.map(
                (item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-3 border">
                      {item.title}
                    </td>

                    <td className="p-3 border">
                      {item.category}
                    </td>

                    <td className="p-3 border">
                      ₹ {item.amount}
                    </td>

                    <td className="p-3 border">
                      {item.type}
                    </td>

                    <td className="p-3 border">
                      {item.date?.split(
                        "T"
                      )[0]}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;