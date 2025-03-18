import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Withdraw() {
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

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const payload = {
      userId: user?.id,
      amount: parseFloat(amount),
    };

    try {
      await axios.post("http://localhost:8080/api/withdraw", payload, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Withdrawal successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Withdrawal failed");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleWithdraw}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          💸 Withdraw Money
        </h2>

        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Withdraw
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full mt-4 bg-gray-300 text-black dark:bg-gray-600 dark:text-white py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-700 transition"
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
}

export default Withdraw;
