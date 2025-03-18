import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: "", date: "", amount: "" });
  const user = JSON.parse(localStorage.getItem("atmUser"));

  const fetchTransactions = async () => {
    const params = {};
    if (filters.type) params.type = filters.type;
    if (filters.date) params.date = filters.date;
    if (filters.amount) params.amount = filters.amount;

    try {
      const res = await axios.get(
        `http://localhost:8080/api/transactions/${user.id}`,
        { params }
      );
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-center md:text-left mb-4 md:mb-0">
          🔍 Search Transactions
        </h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="type"
          placeholder="Type (DEPOSIT or WITHDRAW)"
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-3">
                  {new Date(txn.date).toLocaleDateString()}
                </td>
                <td className="p-3">{txn.type}</td>
                <td className="p-3">₹{txn.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
