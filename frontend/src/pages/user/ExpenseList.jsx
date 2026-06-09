



import { useEffect, useState } from "react";

import {
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../../api/expenseApi";

import SearchBar from "../../components/SearchBar";
import ExpenseTable from "../../components/ExpenseTable";
import { toast } from "react-toastify";

const ExpenseList = () => {

  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editData, setEditData] =
    useState({
      id: "",
      title: "",
      amount: "",
      category: "",
      description: "",
      date: "",
    });

  const fetchExpenses = async () => {

    try {

      const response =
        await getExpenses();

      const onlyExpenses =
        response.data.data.filter(
          item =>
            item.type === "EXPENSE"
        );

      setExpenses(onlyExpenses);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchExpenses();

  }, []);

  const handleDelete = async (id) => {

    try {

      await deleteExpense(id);

      toast.success("Deleted Successfully");

      fetchExpenses();

    } catch (error) {

      console.log(error);

    }

  };

  // Open Modal
  const handleEdit = (expense) => {

    setEditData({
      id: expense.id,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      description:
        expense.description || "",
      date: expense.date,
    });

    setShowModal(true);

  };

  // Update Expense
  const handleUpdateExpense =
    async () => {

      try {

        await updateExpense(
          editData.id,
          {
            title:
              editData.title,

            amount: Number(
              editData.amount
            ),

            category:
              editData.category,

            description:
              editData.description,

            date:
              editData.date,

            type: "EXPENSE",
          }
        );

        
        toast.success("Update Successfully");

        setShowModal(false);

        fetchExpenses();

      } catch (error) {

        console.log(error);

        toast.error("Update Failed")

      }

    };

  const filteredExpenses =
    expenses.filter(
      expense =>
        expense.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        expense.category
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        expense.type
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  return (

    <div>

      <h1 className="text-3xl font-bold mb-5">
        Expense List
      </h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
      />

      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={true}
      />

      {/* Edit Modal */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
            p-4
          "
        >

          <div
            className="
              bg-white
              w-full
              max-w-md
              rounded-lg
              shadow-xl
              p-6
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                mb-4
              "
            >
              Edit Expense
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={
                editData.title
              }
              onChange={(e) =>
                setEditData({
                  ...editData,
                  title:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                p-2
                rounded
                mb-3
              "
            />

            <input
              type="number"
              placeholder="Amount"
              value={
                editData.amount
              }
              onChange={(e) =>
                setEditData({
                  ...editData,
                  amount:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                p-2
                rounded
                mb-3
              "
            />

            <input
              type="text"
              placeholder="Category"
              value={
                editData.category
              }
              onChange={(e) =>
                setEditData({
                  ...editData,
                  category:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                p-2
                rounded
                mb-3
              "
            />

            <textarea
              rows="3"
              placeholder="Description"
              value={
                editData.description
              }
              onChange={(e) =>
                setEditData({
                  ...editData,
                  description:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                p-2
                rounded
                mb-4
              "
            />

            <div
              className="
                flex
                justify-end
                gap-2
              "
            >

              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
                className="
                  px-4
                  py-2
                  bg-gray-500
                  text-white
                  rounded
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  handleUpdateExpense
                }
                className="
                  px-4
                  py-2
                  bg-blue-600
                  text-white
                  rounded
                  hover:bg-blue-700
                "
              >
                Update Expense
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default ExpenseList;