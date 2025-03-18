import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("atmUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchBalance(parsedUser.id);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const fetchBalance = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/balance/${userId}`
      );
      setBalance(res.data);
    } catch (err) {
      console.error("Error fetching balance:", err);
      setBalance("N/A");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("atmUser");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Welcome, {user.name}
      </h1>

      <div className="mb-6 text-xl text-gray-700 dark:text-gray-200">
        <strong>Balance:</strong>{" "}
        {balance !== null ? `₹ ${balance.toFixed(2)}` : "Loading..."}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <button
          onClick={() => navigate("/withdraw")}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Withdraw
        </button>
        <button
          onClick={() => navigate("/deposit")}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Deposit
        </button>
        <button
          onClick={() => navigate("/fast-cash")}
          className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          Fast Cash
        </button>
        <button
          onClick={() => navigate("/transactions")}
          className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
        >
          Transaction History
        </button>
        <button
          onClick={() => navigate("/change-pin")}
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Change PIN
        </button>
        <button
          onClick={() => navigate("/analytics")}
          className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
        >
          Analytics
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Update Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
