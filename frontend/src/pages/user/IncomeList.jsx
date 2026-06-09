import { useEffect, useState } from "react";
import { getIncome } from "../../api/incomeApi";
import ExpenseTable from "../../components/ExpenseTable";

const IncomeList = () => {

  const [income,setIncome] =
    useState([]);

  useEffect(() => {

    const fetchIncome =
      async () => {

      try {

        const response =
          await getIncome();

        setIncome(
          response.data.data
        );

      } catch(error) {

        console.log(error);

      }
    };

    fetchIncome();

  }, []);

  return (

    <div>

      <h1 className="text-2xl font-bold mb-5">
        Income List
      </h1>

      <ExpenseTable
        expenses={income}
        showActions={false}
      />

    </div>

  );
};

export default IncomeList;