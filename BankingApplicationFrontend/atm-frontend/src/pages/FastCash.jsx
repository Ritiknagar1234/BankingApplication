import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function FastCash() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("atmUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleFastCash = async (amount) => {
    try {
      await axios.post(`http://localhost:8080/api/fast-cash`, null, {
        params: {
          userId: user.id,
          amount,
        },
      });
      toast.success(`₹${amount} withdrawn successfully!`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Fast cash error:", err);
      toast.error(err.response?.data?.message || "Fast cash failed");
    }
  };

  if (!user) return null;

  const amounts = [500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Fast Cash
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {amounts.map((amt) => (
            <button
              key={amt}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => handleFastCash(amt)}
            >
              ₹{amt}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-gray-300 dark:bg-gray-600 text-black dark:text-white py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default FastCash;
