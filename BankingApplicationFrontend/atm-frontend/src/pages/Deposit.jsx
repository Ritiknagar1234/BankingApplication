import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Deposit() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("atmUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/api/deposit?userId=${
          user.id
        }&amount=${parseFloat(amount)}`
      );
      toast.success("Deposit successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error Response:", err.response);
      toast.error(err.response?.data?.message || "Deposit failed");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleDeposit}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Deposit Money
        </h2>

        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Deposit
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full mt-4 bg-gray-300 dark:bg-gray-600 text-black dark:text-white py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
}

export default Deposit;
